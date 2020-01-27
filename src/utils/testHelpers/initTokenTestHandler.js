const Users = require('../../users/model');
const jwt = require('../jwt');

const USER = {
  username: 'testdev',
  password: 'pass123'
};

module.exports.createToken = async () => {
  const signin = jwt.signin();

  const data = await Users.create(USER);

  return signin({
    id: data._id,
    username: data.username
  });
};
