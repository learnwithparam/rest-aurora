const { badRequest } = require('./httpResponses');

module.exports.validTweetPost = function(req, res, next) {
  const { body } = req;

  if (!body.text) {
    badRequest(res, { message: 'Fields text is required.' });
  }

  next();
};

module.exports.isUserTweetOwner = async function(req, res, next) {
  const { id } = req.params;
  const { id: creatorId } = req.user || {};

  // TODO: Check whether the user is the tweet owner
  next();
};
