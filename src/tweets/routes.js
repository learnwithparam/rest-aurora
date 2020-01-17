const express = require('express');

const router = express.Router();
const { catchErrors } = require('../errorHandler');
const { validTweetPost } = require('../validationHandler');
const { authenticate } = require('../auth');

const {
  getTweets,
  postTweets,
  putTweets,
  deleteTweets,
  postBatchTweets,
  putBatchTweets
} = require('./controller');

router.use(authenticate());

router.get('/', catchErrors(getTweets));
router.post('/', validTweetPost, catchErrors(postTweets));

router.post('/batch', catchErrors(postBatchTweets));
router.put('/batch', catchErrors(putBatchTweets));

router.put('/:id', catchErrors(putTweets));
router.delete('/:id', catchErrors(deleteTweets));

module.exports = router;
