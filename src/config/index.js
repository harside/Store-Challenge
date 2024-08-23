require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  log_level: process.env.LOG_LEVEL || 'info',
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_user: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  isDevelopment: process.env.NODE_ENV === 'development',
};
