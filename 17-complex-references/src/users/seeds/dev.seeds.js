const faker = require('faker');
const Users = require('../model');

const userGenerator = (number = 5) => {
  return Array(number)
    .fill('')
    .map(() => ({
      username: faker.internet.userName(),
      password: '1234'
    }));
};

const DEV_SEEDS = userGenerator();

const run = async () => {
  for (const users of DEV_SEEDS) {
    try {
      await Users.insertMany(users);
      console.log('SEEDS -> Users inserted to the DB');
    } catch (error) {
      console.log('Error creating SEEDS for "Users":', Users._id);
      continue;
    }
  }
};

module.exports = run;
