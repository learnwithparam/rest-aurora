const Tweet = require('./tweets/model');
const { badRequest } = require('./httpResponses');
module.exports.validTweetPost = function(req, res, next) {
  const { body } = req;

  if (!body.text) {
    badRequest(res, { message: 'Fields text is required.' });
  }

  next();
};

module.exports.validUser = function(req, res, next) {
  const { body } = req;
  if (!body.username || !body.password) {
    badRequest(res, { message: 'Required field is missing' });
  }

  next();
};

/**
 * Middleware to check from authorization if the user is modifying
 * it's tweet
 */
module.exports.isUserTweetOwner = async function(req, res, next) {
  const { id } = req.params;
  const { id: creatorId } = req.user || {};

  try {
    const tweet = await Tweet.findById(id).lean();
    if (tweet.createdBy !== creatorId) {
      throw new Error('Unauthorized to do request');
    }
  } catch (error) {
    badRequest(res, { error: error.message });
  }
  next();
};
