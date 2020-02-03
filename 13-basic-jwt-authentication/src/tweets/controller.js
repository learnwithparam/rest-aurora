const Tweets = require('./model');
const paginate = require('express-paginate');
const { ok, unexpectedError } = require('../httpResponses');

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

module.exports = {
  getTweets,
  postTweets,
  putTweets,
  deleteTweets
};
