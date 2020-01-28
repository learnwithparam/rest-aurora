const express = require('express');

const router = express.Router();

const {
  getTweets,
  postTweets,
  putTweets,
  deleteTweets
} = require('./controller');

// TODO: Add validation middlewares to the relevant routes

router.get('/', getTweets);
router.post('/', postTweets);

router.put('/:id', putTweets);
router.delete('/:id', deleteTweets);

module.exports = router;
