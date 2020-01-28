module.exports.validTweetPost = function(req, res, next) {
  const { body } = req;

  // TODO: Validate body tweet content

  next();
};
