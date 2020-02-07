const Tweets = require('./model');
const { created, ok, badRequest } = require('../httpResponses');

// TODO 2: Use standardized success and error responses

const getTweets = async (req, res) => {
  try {
    const tweets = await Tweets.find({});
    ok(res, { message: 'all tweets data', data: tweets });
  } catch (err) {
    badRequest(res, {
      errors: [
        {
          field: 'username',
          message: `${err.message}`
        },
        {
          field: 'password',
          message: 'error 2'
        }
      ]
    });
  }
};

const postTweets = async (req, res) => {
  const { text } = req.body;
  const tweet = await Tweets.create({ text });
  created(res, { data: tweet });
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
