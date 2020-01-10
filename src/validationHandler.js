const { badRequest } = require('./httpResponses');
module.exports.validTweetPost = function(req, res, next) {
  const { body } = req;

  if (!body.text) {
    badRequest(res, { message: 'Fields text is required.' });
  }

  next();
};
