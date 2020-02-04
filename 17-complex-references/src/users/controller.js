const Users = require('./model');
const { ok, unexpectedError } = require('../httpResponses');
const jwt = require('../utils/jwt');

const postUsers = async (req, res) => {
  try {
    const data = await (await Users.create(req.body)).toJSON();
    delete data.password;
    ok(res, { results: data });
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
    // TODO: Follow / Unfollow a user

    ok(res);
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

module.exports = {
  postUsers,
  loginUsers,
  deleteUsers,
  followUser
};
