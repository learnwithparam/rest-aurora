const Tweets = require('./model');
const { ok, unexpectedError } = require('../httpResponses');
const paginate = require('express-paginate');

// for the sake of this example we will create a query builder to identify how we want to filter our data.
// @param now sure how we can implement this.
const queryBuilder = ({ type, q = '' }) => {
  let query = {};

  if (!q) return query;

  if (type === 'fulltext') {
    query = { $text: { $search: q } };
  } else {
    query = { text: { $regex: new RegExp(q, 'i') } };
  }

  return query;
};

const sortingBuilder = ({ sortBy, orderBy }) => {
  const SORT_PROPERTY = ['text', 'createdAt', 'updatedAt'];
  const sortKey = SORT_PROPERTY.includes(sortBy)
    ? sortBy
    : SORT_PROPERTY['text'];

  return {
    [sortKey]: orderBy === 'desc' ? -1 : 1
  };
};

const getTweets = async (req, res) => {
  const { q, type, sortBy = 'text', orderBy = 'asc' } = req.query;
  const sort = sortingBuilder({ sortBy, orderBy });
  try {
    const [results, itemCount] = await Promise.all([
      Tweets.find(queryBuilder({ q, type }))
        .limit(req.query.limit)
        .skip(req.skip)
        .sort(sort)
        .lean()
        .exec(),
      Tweets.find(queryBuilder({ q, type })).countDocuments({})
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
  const { id: createdBy } = req.user || {};
  try {
    const data = await Tweets.create({ text, createdBy });
    ok(res, { results: data });
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

const putTweets = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const { id: updatedBy } = req.user || {};
  try {
    await Tweets.findByIdAndUpdate(
      id,
      { text, updatedBy },
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
  const { id: createdBy } = req.user || {};
  try {
    const data = await Tweets.insertMany(
      req.body.map(body => ({
        ...body,
        createdBy
      }))
    );
    ok(res, { results: data });
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

const putBatchTweets = async (req, res) => {
  const { id: updatedBy } = req.user || {};
  try {
    const body = req.body.map(({ _id, ...payload }) => {
      return Tweets.findByIdAndUpdate(
        _id,
        { ...payload, updatedBy },
        {
          lean: true,
          strict: true,
          useFindAndModify: false
        }
      );
    });

    await Promise.all(body);

    ok(res, { message: 'Updated' });
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

const likeTweets = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user || {};
  try {
    const Tweet = await Tweets.findOne({
      _id: id
    });
    if (Tweet) {
      const action = Tweet.likes.includes(userId) ? '$pull' : '$push';

      await Tweet.update(
        {
          [action]: { likes: userId }
        },
        { multi: true, returnOriginal: false }
      );
    }

    ok(res);
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

const reTweet = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user || {};
  try {
    const Tweet = await Tweets.findByIdAndUpdate(
      {
        _id: id
      },
      { $addToSet: { retweets: userId } },
      { new: true }
    );

    ok(res, { data: Tweet });
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
  putBatchTweets,
  likeTweets,
  reTweet
};
