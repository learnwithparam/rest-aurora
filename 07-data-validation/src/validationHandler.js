module.exports.validTweetPost = function(req, res, next) {
  const { body } = req;

  if (!body.text) {
    return res.json({
      error: 'text is empty'
    });
  }

  next();
};
