const Tweets = require('./tweets/model');

module.exports.validTweetPost = function(req, res, next) {
  const { body } = req;

  // TODO: Validate body tweet content

  next();
};

module.exports.validTweetId = function(req, res, next) {
  const { params } = req;

  // TODO: Validate ID from params

  next();
};
