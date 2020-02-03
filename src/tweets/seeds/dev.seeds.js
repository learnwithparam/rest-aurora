const faker = require('faker');
const Tweets = require('../model');

const tweetGenerator = (number = 100) => {
  return Array(number)
    .fill('')
    .map(() => ({
      text: faker.lorem.text()
    }));
};
// Fill this with prod tweets related
const DEV_SEEDS = tweetGenerator();

const run = async () => {
  for (const tweets of DEV_SEEDS) {
    try {
      await Tweets.insertMany(tweets);
      console.log('SEEDS -> Tweets inserted to the DB');
    } catch (error) {
      console.log('Error creating SEEDS for "Tweets":', tweets._id);
      continue;
    }
  }
};

module.exports = run;
