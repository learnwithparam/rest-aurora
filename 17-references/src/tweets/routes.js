const express = require('express');

const router = express.Router();
const { catchErrors } = require('../errorHandler');
const { validTweetPost, isUserTweetOwner } = require('../validationHandler');

const {
  getTweets,
  postTweets,
  putTweets,
  deleteTweets
} = require('./controller');
const { authenticate, attachUserMiddleware } = require('../auth');

router.get('/', catchErrors(getTweets));

router.use(authenticate());
router.use(attachUserMiddleware);

router.post('/', validTweetPost, catchErrors(postTweets));

router.put('/:id', isUserTweetOwner, catchErrors(putTweets));
router.delete('/:id', isUserTweetOwner, catchErrors(deleteTweets));

// TODO: Add endpoints for Like and Retweet functionality

module.exports = router;
