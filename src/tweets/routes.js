const express = require('express');

const router = express.Router();
const {
  getTweets,
  postTweets,
  putTweets,
  deleteTweets,
  postBatchTweets,
  putBatchTweets
} = require('./controller');

router.get('/', getTweets);
router.post('/', postTweets);

router.post('/batch', postBatchTweets);
router.put('/batch', putBatchTweets);

router.put('/:id', putTweets);
router.delete('/:id', deleteTweets);

module.exports = router;
