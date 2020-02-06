const Tweets = require('./model');

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
  const tweet = await Tweets.findByIdAndUpdate(
    id,
    { text },
    { new: true, strict: true, useFindAndModify: false }
  ).lean();

  res.json({ data: tweet, message: 'Tweet Updated' });
};

const deleteTweets = async (req, res) => {
  const { id } = req.params;
  try {
    await Tweets.findByIdAndDelete(id);
    res.json({ message: 'Tweet Deleted' });
  } catch (err) {
    res.json({
      error: `${err.toString()}`
    });
  }
};

module.exports = {
  getTweets,
  postTweets,
  putTweets,
  deleteTweets
};
