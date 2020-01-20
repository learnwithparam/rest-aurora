const express = require('express');

const router = express.Router();
const { catchErrors } = require('../errorHandler');
const { validUser } = require('../validationHandler');
const { authenticate } = require('../auth');

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  loginUsers,
  getUserTweets
} = require('./controller');

router.post('/login', catchErrors(loginUsers));
router.get('/', authenticate(), catchErrors(getUsers));
router.get('/:id/tweets', authenticate(), catchErrors(getUserTweets));
router.post('/', authenticate(), validUser, catchErrors(postUsers));

router.put('/:id', authenticate(), catchErrors(putUsers));
router.delete('/:id', authenticate(), catchErrors(deleteUsers));

module.exports = router;
