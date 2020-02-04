const express = require('express');

const router = express.Router();
const { catchErrors } = require('../errorHandler');
const { validTweetPost } = require('../validationHandler');

const {
  getTweets,
  postTweets,
  putTweets,
  deleteTweets
} = require('./controller');
const { authenticate, attachUserMiddleware } = require('../auth');

router.get('/', catchErrors(getTweets));

router.post('/', validTweetPost, catchErrors(postTweets));

// TODO: Validate whether the loggedin user has permission to delete or update tweet
router.put(
  '/:id',
  authenticate(),
  attachUserMiddleware,
  catchErrors(putTweets)
);
router.delete(
  '/:id',
  authenticate(),
  attachUserMiddleware,
  catchErrors(deleteTweets)
);

module.exports = router;
