const express = require('express');

const router = express.Router();
const { catchErrors } = require('../errorHandler');
const { validTweetPost, isUserTweetOwner } = require('../validationHandler');
const { authenticate, attachUserMiddleware } = require('../auth');

const {
  getTweets,
  postTweets,
  putTweets,
  deleteTweets,
  postBatchTweets,
  putBatchTweets
} = require('./controller');

router.use(authenticate());
router.use(attachUserMiddleware);

router.get('/', catchErrors(getTweets));
router.post('/', validTweetPost, catchErrors(postTweets));

router.post('/batch', catchErrors(postBatchTweets));
router.put('/batch', catchErrors(putBatchTweets));

router.put('/:id', isUserTweetOwner, catchErrors(putTweets));
router.delete('/:id', isUserTweetOwner, catchErrors(deleteTweets));

module.exports = router;
