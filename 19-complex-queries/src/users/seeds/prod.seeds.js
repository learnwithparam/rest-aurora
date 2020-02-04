const Users = require('../model');

// Fill this with prod tweets related
const PROD_USERS = [];

const run = async () => {
  for (const users of PROD_USERS) {
    try {
      await Users.insertMany([users]);
      console.log('SEEDS -> Users inserted to the DB');
    } catch (error) {
      console.log('Error creating SEEDS for "Users":', Users._id);
      continue;
    }
  }
};

module.exports = run;
