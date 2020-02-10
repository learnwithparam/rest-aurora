const faker = require('faker');
const Tweets = require('../model');

const tweetGenerator = (number = 100) => {
  return Array(number)
    .fill('')
    .map(() => ({
      text: faker.lorem.text()
    }));
};

const DEV_SEEDS = tweetGenerator(1000);

const run = async () => {
  await Tweets.insertMany(DEV_SEEDS);
  console.log('SEEDS -> Tweets inserted to the DB');
};

module.exports = run;
