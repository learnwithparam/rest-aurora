const Tweets = require('./model');

const getTweets = async (req, res) => {
  // TODO: Find all tweets from database and show
  res.json({ data: tweets });
};

const postTweets = async (req, res) => {
  const { text } = req.body;
  // TODO: Create a new tweet from the text
  res.json({ data: tweet, message: 'Tweet Created' });
};

const putTweets = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  // TODO: Find the tweet by ID and update the text
  res.json({ data: tweet, message: 'Tweet Updated' });
};

const deleteTweets = async (req, res) => {
  const { id } = req.params;
  // TODO: Find the tweet by ID and delete the tweet
  res.json({ message: 'Tweet Deleted' });
};

module.exports = {
  getTweets,
  postTweets,
  putTweets,
  deleteTweets
};
