const Tweets = require('./model');

// TODO 1: Try catch all async await errors

// TODO 2: Use standardized success and error responses

const getTweets = async (req, res) => {
  const tweets = await Tweets.find({});
  res.json({ data: tweets });
};

const postTweets = async (req, res) => {
  const { text } = req.body;
  const tweet = await Tweets.create({ text });
  res.json({ data: tweet, message: 'Tweet Created' });
};

const putTweets = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
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
