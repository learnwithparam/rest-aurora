const logger = require('./utils/logger');

module.exports = require('express-pino-logger')({
  logger
});
