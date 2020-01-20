const paginate = require('express-paginate');
const Users = require('./model');
const Tweets = require('../tweets/model');
const { ok, unexpectedError } = require('../httpResponses');
const jwt = require('../utils/jwt');

const queryBuilder = ({ type, q = '' }) => {
  let query = {};

  if (!q) return query;

  if (type === 'fulltext') {
    query = { $text: { $search: q } };
  } else {
    query = { username: { $regex: new RegExp(q, 'i') } };
  }

  return query;
};

const sortingBuilder = ({ sortBy, orderBy }) => {
  const SORT_PROPERTY = ['username', 'createdAt', 'updatedAt'];
  const sortKey = SORT_PROPERTY.includes(sortBy)
    ? sortBy
    : SORT_PROPERTY['username'];

  return {
    [sortKey]: orderBy === 'desc' ? -1 : 1
  };
};

const getUsers = async (req, res) => {
  const { q, type, sortBy = 'text', orderBy = 'asc' } = req.query;
  const sort = sortingBuilder({ sortBy, orderBy });
  try {
    const [results, itemCount] = await Promise.all([
      Users.find(queryBuilder({ q, type }))
        .select('-password')
        .limit(req.query.limit)
        .skip(req.skip)
        .sort(sort)
        .lean()
        .exec(),
      Users.find(queryBuilder({ q, type })).countDocuments({})
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

const getUserTweets = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await Tweets.find({
      $or: [{ createdBy: id }, { retweets: { $in: [id] } }]
    });

    ok(res, {
      results
    });
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

const postUsers = async (req, res) => {
  try {
    const data = await Users.create(req.body);
    data && delete data.password;
    ok(res, { results: data });
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

const putUsers = async (req, res) => {
  const { id } = req.params;
  try {
    await Users.findByIdAndUpdate(id, req.body, {
      lean: true,
      strict: true,
      useFindAndModify: false
    });
    ok(res, { message: 'Updated' });
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;
  try {
    //soft delete
    await Users.findByIdAndUpdate(id, { isActivate: false });
    ok(res, { message: 'Successfully deleted' });
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

const loginUsers = async (req, res) => {
  const { username, password } = req.body;
  const signin = jwt.signin();
  try {
    const User = await Users.findOne({ username });
    const validPassword = await User.comparePassword(password);

    if (validPassword) {
      ok(res, {
        token: signin({
          id: User._id,
          username: User.username
        })
      });
    }
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  loginUsers,
  getUserTweets
};
