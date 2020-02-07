const faker = require('faker');
const Tweets = require('../model');

const tweetGenerator = (number = 100) => {
  return Array(number)
    .fill('')
    .map(() => {
      return { text: faker.lorem.text() };
    });
  // TODO 2: Delete all tweets before creating
  // TODO 3: Create tweets with mongo ObjectID
};

const DEV_SEEDS = tweetGenerator(1000);

const run = async () => {
  await Tweets.remove({});
  try {
    await Tweets.insertMany(DEV_SEEDS);
    console.log('SEEDS -> Tweets inserted to the DB');
  } catch (error) {
    console.log('Error creating SEEDS for "Tweets"');
  }
};

module.exports = run;
