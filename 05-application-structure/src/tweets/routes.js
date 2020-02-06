const express = require('express');
const router = express.Router();

const {
  postTweets,
  putTweets,
  deleteTweets,
  getTweet,
  getTweets
} = require('./controllers');

router.post('/', postTweets);
router.get('/', getTweets);
router.get('/:id', getTweet);
router.put('/:id', putTweets);
router.delete('/:id', deleteTweets);

module.exports = router;
