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

TweetSchema.index({ text: 'text' });

const Tweet = model('tweets', TweetSchema);

module.exports = Tweet;
