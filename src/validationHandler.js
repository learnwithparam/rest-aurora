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
  console.log(body);
  if (!body.username || !body.password) {
    badRequest(res, { message: 'Required field is missing' });
  }

  next();
};
