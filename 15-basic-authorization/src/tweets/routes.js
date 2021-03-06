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

router.use(authenticate());
router.use(attachUserMiddleware);

router.post('/', validTweetPost, catchErrors(postTweets));

// TODO: Validate whether the loggedin user has permission to delete or update tweet
router.put('/:id', catchErrors(putTweets));
router.delete('/:id', catchErrors(deleteTweets));

module.exports = router;
