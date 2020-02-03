const Users = require('./model');
const { ok, unexpectedError } = require('../httpResponses');
const jwt = require('../utils/jwt');

const postUsers = async (req, res) => {
  try {
    // TODO 1: Create a new user and send the result
    // TODO 2: Make sure password is not shared in the response
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

const loginUsers = async (req, res) => {
  const { username, password } = req.body;
  try {
    // TODO 1: Find the user
    // TODO 2: Validate password
    // TODO 3: Create a JWT token for the user
    // TODO 4: Send the token as response
  } catch (err) {
    unexpectedError(res, { message: `Something went wrong ${err.toString()}` });
  }
};

// TODO: Delete users controller

module.exports = {
  postUsers,
  loginUsers
};
