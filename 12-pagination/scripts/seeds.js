require('dotenv').config(); // Load the env config

const path = require('path');
const mongoose = require('mongoose');
const util = require('util');
const glob = util.promisify(require('glob'));

const PRODUCTION_SEEDS = ['prod.seeds.js'];
const DEVELOPMENT_SEEDS = ['dev.seeds.js'];

const cleanRegexFileMatcher = seeds =>
  seeds.length > 1 ? `{${seeds.join(',')}}` : seeds.join(',');

const filePathModifier = () => {
  // Get the regex for all files based on NODE_ENV
  const seedsFiles =
    process.env.NODE_ENV === 'production'
      ? PRODUCTION_SEEDS
      : DEVELOPMENT_SEEDS;

  return `../src/**/${cleanRegexFileMatcher(seedsFiles)}`;
};

const run = async () => {
  try {
    // Connect to mongoDB
    await mongoose.connect(
      process.env.MONGO_CONNECTION_STRING ||
        'mongodb://localhost:27017/microtwits',
      { useNewUrlParser: true }
    );

    // Using glob, get all the files matching the regex
    const files = await glob(path.join(__dirname, filePathModifier()));

    // Run all the files
    await Promise.all(
      files.map(file => {
        return require(file)();
      })
    );
  } finally {
    console.log('Seeding completed');
    await mongoose.connection.close(); // Close the connection
  }
};

module.exports = run();
