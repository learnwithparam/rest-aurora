require('dotenv').config();

const path = require('path');
const mongoose = require('mongoose');
// const glob = require('glob');
const util = require('util');
const glob = util.promisify(require('glob'));

const PRODUCTION_SEEDS = ['prod.seeds.js'];
const DEVELOPMENT_SEEDS = ['dev.seeds.js'];

const cleanRegexFileMatcher = seeds =>
  seeds.length > 1 ? `{${seeds.join(',')}}` : seeds.join(',');

const filePathModifier = () => {
  const seedsFiles =
    process.env.NODE_ENV === 'production'
      ? PRODUCTION_SEEDS
      : DEVELOPMENT_SEEDS;

  return `../src/**/${cleanRegexFileMatcher(seedsFiles)}`;
};

const run = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_CONNECTION_STRING ||
        'mongodb://localhost:27017/sample-db',
      { useNewUrlParser: true }
    );
    const files = await glob(path.join(__dirname, filePathModifier()));
    await Promise.all(
      files.map(file => {
        return require(file)();
      })
    );
  } finally {
    console.log('Seeding completed');
    await mongoose.connection.close();
  }
};

module.exports = run();
