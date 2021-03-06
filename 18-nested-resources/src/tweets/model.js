const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const TweetSchema = new Schema(
  {
    text: String,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    ],
    retweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  {
    timestamps: true
  }
);

TweetSchema.index({ text: 'text' });

const Tweet = model('tweets', TweetSchema);

module.exports = Tweet;
