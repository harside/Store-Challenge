const app = require('./app');
const config = require('./config');
const database = require('./config/databases/postgres');
const pino = require('pino');
const logger = pino();

const PORT = config.port;

const start = async () => {
  try {
    await database.authenticate();
    logger.info('Connection to database was established successfully');
    app.listen(PORT);
    logger.info(`Server running on port ${PORT}`);
  } catch (error) {
    logger.error('Failed trying to run the server', error);
  }
};

start();
