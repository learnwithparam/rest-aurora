const tweets = require('./model');

const postTweets = async (req, res) => {
  const { text = '' } = req.body;
  if (!text) {
    res.status(400).json({
      message: 'Bad Request, Invalid text'
    });
  }

  tweets.push({ text }); // Push to the tweets array

  res.json({ data: tweets[tweets.length - 1], message: 'Tweet Created' });
};

const getTweets = async (req, res) => {
  const tweetData = await Promise.resolve(tweets);
  res.json({ data: tweetData });
};

const putTweets = (req, res) => {
  const { id } = req.params;
  if (id > tweets.length - 1) {
    req.status(404).json({ message: 'Tweet ID not found' });
  }

  const { text = '' } = req.body;
  if (!text) {
    res.status(400).json({
      message: 'Bad Request, Invalid text'
    });
  }

  tweets[id].text = text; // Update the tweet text

  res.json({ data: tweets[id], message: 'Tweet Updated' });
};

const deleteTweets = (req, res) => {
  const { id } = req.params;
  if (id > tweets.length - 1) {
    req.status(404).json({ message: 'Tweet ID not found' });
  }

  tweets.splice(id, 1); // Delete the tweet from the array
  res.json({ message: 'Tweet Deleted' });
};

const getTweet = (req, res) => {
  const { id } = req.params;
  if (id > tweets.length - 1) {
    req.status(404).json({ message: 'Tweet ID not found' });
  }

  res.json({ data: tweets[id] });
};

module.exports = {
  postTweets,
  putTweets,
  getTweets,
  deleteTweets,
  getTweet
};
