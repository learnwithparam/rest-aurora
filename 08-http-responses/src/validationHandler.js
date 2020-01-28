module.exports.validTweetPost = function(req, res, next) {
  const { body } = req;

  if (!body.text) {
    res.status(400).json({ message: 'Fields text is required.' });
  }

  next();
};
