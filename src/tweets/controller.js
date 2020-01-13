const Tweets = require('./model');
const { ok, unexpectedError } = require('../httpResponses');
const paginate = require('express-paginate');

const getTweets = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      Tweets.find({})
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Tweets.countDocuments({})
    ]);

    const pageCount = Math.ceil(itemCount / req.query.limit);

    ok(res, {
      hasMore: paginate.hasNextPages(req)(pageCount),
      links: {
        prev: paginate.href(req)(true, {}),
        next: paginate.href(req)(false, {})
      },
      total: itemCount,
      pageCount,
      results
    });
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};
const postTweets = async (req, res) => {
  const { text } = req.body;
  try {
    const data = await Tweets.create({ text });
    ok(res, { results: data });
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
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
    ok(res, { message: 'Updated' });
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

const deleteTweets = async (req, res) => {
  const { id } = req.params;
  try {
    await Tweets.findByIdAndDelete(id);
    ok(res, { message: 'Successfully deleted' });
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

const postBatchTweets = async (req, res) => {
  try {
    const data = await Tweets.insertMany(req.body);
    ok(res, { results: data });
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

const putBatchTweets = async (req, res) => {
  try {
    const body = req.body.map(({ _id, ...payload }) => {
      return Tweets.findByIdAndUpdate(_id, payload, {
        lean: true,
        strict: true,
        useFindAndModify: false
      });
    });

    await Promise.all(body);

    ok(res, { message: 'Updated' });
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
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
