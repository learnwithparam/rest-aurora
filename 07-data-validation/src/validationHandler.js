const Tweets = require('./tweets/model');

module.exports.validateTweet = function(req, res, next) {
  const { body, params } = req;

  // TODO 1: Validate body tweet content
  // TODO 2: Validate ID from params

  next();
};
