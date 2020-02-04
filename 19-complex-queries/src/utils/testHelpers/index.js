const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  ...require('./initDBTestHandler'),
  ...require('./initTokenTestHandler')
};
