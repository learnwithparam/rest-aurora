const Tweets = require('../model');

// Fill this with prod tweets related
const PROD_TWEETS = [];

const run = async () => {
  for (const tweets of PROD_TWEETS) {
    try {
      await Tweets.insertMany([tweets]);
      console.log('SEEDS -> Tweets inserted to the DB');
    } catch (error) {
      console.log('Error creating SEEDS for "Tweets":', Tweets._id);
      continue;
    }
  }
};

module.exports = run;
