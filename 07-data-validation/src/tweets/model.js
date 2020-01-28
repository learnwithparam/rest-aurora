const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// Create a tweet schema
const TweetSchema = new Schema(
  {
    text: String
  },
  {
    timestamps: true
  }
);

TweetSchema.index({ text: 'text' }); // Add index for the fields

const Tweet = model('tweets', TweetSchema); // Create a model from the Schema

module.exports = Tweet;
