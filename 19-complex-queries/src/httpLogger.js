const logger = require('./utils/logger');

module.exports = require('express-pino-logger')({
  logger,
  customLogLevel: res => {
    if (res.statusCode >= 300 || res.statusCode < 200) {
      return 'error';
    }
    return 'info';
  }
});
