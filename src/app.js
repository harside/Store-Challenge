const express = require('express');
const pino = require('pino');
const path = require('path');
const pinoHttp = require('pino-http');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const routes = require('./routes');
const errorHandlerMiddleware = require('./middlewares/errorHandler');

const app = express();

const swaggerDocument = YAML.parse(
  fs.readFileSync(path.join(__dirname + '../../docs/index.yaml'), 'utf8')
);

require('./config/databases/postgres');

// Middleware to parse JSON
app.use(express.json());

app.use(
  pinoHttp({
    logger: pino({
      level: process.env.LOG_LEVEL || 'info',
    }),
  })
);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api', routes);

// Middleware to handle errors
app.use(errorHandlerMiddleware);

module.exports = app;
