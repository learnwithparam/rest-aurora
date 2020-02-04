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

router.get('/', catchErrors(getTweets));

// TODO: Protect create, update and delete endpoints in tweets

router.post('/', validTweetPost, catchErrors(postTweets));

router.put('/:id', catchErrors(putTweets));
router.delete('/:id', catchErrors(deleteTweets));

module.exports = router;
