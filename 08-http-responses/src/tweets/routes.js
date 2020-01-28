const express = require('express');

const router = express.Router();

const {
  getTweets,
  postTweets,
  putTweets,
  deleteTweets
} = require('./controller');

const { validTweetPost } = require('../validationHandler');

router.get('/', getTweets);
router.post('/', validTweetPost, postTweets);

router.put('/:id', validTweetPost, putTweets);
router.delete('/:id', deleteTweets);

module.exports = router;
