const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const TweetSchema = new Schema(
  {
    text: String
  },
  {
    timestamps: true
  }
);

const Tweet = model('Tweet', TweetSchema);
module.exports = Tweet;
