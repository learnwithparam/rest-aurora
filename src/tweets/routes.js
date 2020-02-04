const express = require('express');

const router = express.Router();
const { catchErrors } = require('../errorHandler');
const { validTweetPost, isUserTweetOwner } = require('../validationHandler');
const { authenticate, attachUserMiddleware } = require('../auth');

const {
  getTweets,
  getTweet,
  postTweets,
  putTweets,
  deleteTweets,
  postBatchTweets,
  putBatchTweets,
  likeTweets,
  reTweet
} = require('./controller');

router.use(authenticate());
router.use(attachUserMiddleware);

router.get('/', catchErrors(getTweets));
router.get('/:id', catchErrors(getTweet));
router.post('/', validTweetPost, catchErrors(postTweets));

router.post('/batch', catchErrors(postBatchTweets));
router.put('/batch', catchErrors(putBatchTweets));

router.put('/:id', isUserTweetOwner, catchErrors(putTweets));
router.delete('/:id', isUserTweetOwner, catchErrors(deleteTweets));

router.put('/:id/like', catchErrors(likeTweets));
router.put('/:id/retweet', catchErrors(reTweet));

module.exports = router;
