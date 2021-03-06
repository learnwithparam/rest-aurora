const { badRequest } = require('./httpResponses');
const Tweets = require('./tweets/model');

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

  try {
    const tweet = await Tweets.findById(id).lean();
    if (`${tweet.createdBy}` !== `${creatorId}`) {
      throw new Error('Unauthorized to do request');
    }
  } catch (error) {
    badRequest(res, { error: error.message });
  }
  next();
};

module.exports.followValidation = async function(req, res, next) {
  const { id } = req.params;
  const { id: userId } = req.user || {};

  try {
    if (`${id}` !== `${userId}`) {
      throw new Error('Cannot follow userId');
    }
  } catch (error) {
    badRequest(res, { error: error.message });
  }
  next();
};
