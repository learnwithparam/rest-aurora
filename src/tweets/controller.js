const Tweets = require('./model');

const getTweets = async (req, res) => {
  try {
    const data = await Tweets.find();
    res.json({ code: 200, results: data });
  } catch (err) {
    res.json({ code: 500, message: `Something went wrong ${err.toString()}` });
  }
};
const postTweets = async (req, res) => {
  const { text } = req.body;
  try {
    const data = await Tweets.create({ text });
    res.json({ code: 201, results: data });
  } catch (err) {
    res.json({ code: 500, message: `Something went wrong ${err.toString()}` });
  }
};

const putTweets = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    await Tweets.findByIdAndUpdate(
      id,
      { text },
      { lean: true, strict: true, useFindAndModify: false }
    );
    res.json({ code: 204, message: 'Updated' });
  } catch (err) {
    res.json({ code: 500, message: `Something went wrong ${err.toString()}` });
  }
};

const deleteTweets = async (req, res) => {
  const { id } = req.params;
  try {
    await Tweets.findByIdAndDelete(id);
    res.json({ code: 204, message: 'Successfully deleted' });
  } catch (err) {
    res.json({ code: 500, message: `Something went wrong ${err.toString()}` });
  }
};

const postBatchTweets = async (req, res) => {
  try {
    const data = await Tweets.insertMany(req.body);
    res.json({ code: 201, results: data });
  } catch (err) {
    res.json({ code: 500, message: `Something went wrong ${err.toString()}` });
  }
};

const putBatchTweets = async (req, res) => {
  try {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const body = req.body.map(({ _id, ...payload }) => {
      return Tweets.findByIdAndUpdate(_id, payload, {
        lean: true,
        strict: true,
        useFindAndModify: false
      });
    });

    await Promise.all(body);

    res.json({ code: 204, message: 'Updated' });
  } catch (err) {
    res.json({ code: 500, message: `Something went wrong ${err.toString()}` });
  }
};

module.exports = {
  getTweets,
  postTweets,
  putTweets,
  deleteTweets,
  postBatchTweets,
  putBatchTweets
};
