const mongoose = require('mongoose');
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

const getUserOverview = async (req, res) => {
  const { id } = req.params;

  // TODO: Explain complex endpoints and aggregated data
  // TODO 1: Match
  // TODO 2: Lookup
  // TODO 3: Pipelines
  // TODO 4: Projection

  try {
    const [results] = await Users.aggregate()
      .match({
        _id: mongoose.Types.ObjectId(id)
      })
      .lookup({
        from: 'tweets',
        let: { id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [
                  { $eq: ['$createdBy', '$$id'] },
                  { $in: ['$$id', '$retweets'] },
                  { $in: ['$$id', '$likes'] }
                ]
              }
            }
          }
        ],
        as: 'tweets'
      })
      .lookup({
        from: 'users',
        localField: '_id',
        foreignField: 'followers',
        as: 'following'
      })
      .project({
        totalTweets: {
          $filter: {
            input: '$tweets',
            as: 'tweets',
            cond: { $eq: ['$$tweets.createdBy', mongoose.Types.ObjectId(id)] }
          }
        },
        totalLikes: {
          $filter: {
            input: '$tweets',
            as: 'tweets',
            cond: { $in: [mongoose.Types.ObjectId(id), '$$tweets.likes'] }
          }
        },
        totalRetweets: {
          $filter: {
            input: '$tweets',
            as: 'tweets',
            cond: { $in: [mongoose.Types.ObjectId(id), '$$tweets.retweets'] }
          }
        },
        followers: '$followers',
        following: '$following'
      })
      .project({
        tweets: { $size: '$totalTweets' },
        likes: { $size: '$totalLikes' },
        retweets: { $size: '$totalRetweets' },
        following: { $size: '$following' },
        followers: { $size: '$followers' }
      });

    ok(res, {
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
    const data = await (await Users.create(req.body)).toJSON();
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
    await Users.findByIdAndUpdate(
      id,
      { isActivate: false },
      { lean: true, strict: true, useFindAndModify: false }
    );
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

const followUser = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user || {};
  try {
    const User = await Users.findOne({
      _id: id
    });
    if (User) {
      const action = User.followers.includes(userId) ? '$pull' : '$push';

      await User.update(
        {
          [action]: { followers: userId }
        },
        { multi: true, returnOriginal: false }
      );
    }

    ok(res);
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

module.exports = {
  getUsers,
  getUserOverview,
  postUsers,
  putUsers,
  deleteUsers,
  loginUsers,
  getUserTweets,
  followUser
};
