const faker = require('faker');
const mongoose = require('mongoose');
const Tweets = require('../model');

const tweetGenerator = (number = 100) => {
  // TODO 1: Create fake tweets
  // TODO 2: Delete all tweets before creating
  // TODO 3: Create tweets with mongo ObjectID
};

const DEV_SEEDS = tweetGenerator();

const run = async () => {
  try {
    // TODO: Insert all the tweets to the DB
    console.log('SEEDS -> Tweets inserted to the DB');
  } catch (error) {
    console.log('Error creating SEEDS for "Tweets"');
  }
};

module.exports = run;
