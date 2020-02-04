const express = require('express');

const router = express.Router();

const { followValidation } = require('../validationHandler');
const { catchErrors } = require('../errorHandler');
const { authenticate } = require('../auth');

const {
  postUsers,
  loginUsers,
  deleteUsers,
  followUser,
  getUserTweets
} = require('./controller');

router.post('/login', catchErrors(loginUsers));

router.post('/', authenticate(), catchErrors(postUsers));
router.delete('/:id', authenticate(), catchErrors(deleteUsers));

router.put(
  '/:id/follow',
  authenticate(),
  followValidation,
  catchErrors(followUser)
);

// TODO: endpoint to get tweet of an user

module.exports = router;
