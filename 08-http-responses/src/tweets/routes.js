const express = require('express');

const router = express.Router();

const {
  getTweets,
  postTweets,
  putTweets,
  deleteTweets
} = require('./controller');

const { validTweetPost } = require('../validationHandler');
const { catchErrors } = require('../errorHandler');

router.get('/', catchErrors(getTweets));
router.post('/', validTweetPost, catchErrors(postTweets));

router.put('/:id', catchErrors(putTweets));
router.delete('/:id', catchErrors(deleteTweets));

module.exports = router;
