const express = require('express');

const router = express.Router();

const {
  getTweets,
  postTweets,
  putTweets,
  deleteTweets
} = require('./controller');

router.get('/', getTweets);
router.post('/', postTweets);

router.put('/:id', putTweets);
router.delete('/:id', deleteTweets);

module.exports = router;
