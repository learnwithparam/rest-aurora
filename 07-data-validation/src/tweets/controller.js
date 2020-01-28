const Tweets = require('./model');

const getTweets = async (req, res) => {
  const tweets = await Tweets.find({});
  res.json({ data: tweets });
};

const postTweets = async (req, res) => {
  const { text } = req.body;
  // TODO: Validate text value
  const tweet = await Tweets.create({ text });
  res.json({ data: tweet, message: 'Tweet Created' });
};

const putTweets = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  // TODO: Validate text Value
  const tweet = await Tweets.findByIdAndUpdate(id, { text }, { new: true });
  res.json({ data: tweet, message: 'Tweet Updated' });
};

const deleteTweets = async (req, res) => {
  const { id } = req.params;
  await Tweets.findByIdAndDelete(id);
  res.json({ message: 'Tweet Deleted' });
};

module.exports = {
  getTweets,
  postTweets,
  putTweets,
  deleteTweets
};
