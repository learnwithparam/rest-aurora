const pino = require('pino');

module.exports = pino({
  prettyPrint: {
    levelFirst: true
  },
  prettifier: require('pino-pretty')
});
