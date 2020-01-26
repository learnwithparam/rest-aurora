const express = require('express');

const router = express.Router();
const { catchErrors } = require('../errorHandler');
const { validUser, followValidation } = require('../validationHandler');
const { authenticate } = require('../auth');

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  loginUsers,
  getUserTweets,
  followUser,
  getUserOverview
} = require('./controller');

router.post('/login', catchErrors(loginUsers));
router.get('/', authenticate(), catchErrors(getUsers));
router.get('/:id/overview', authenticate(), catchErrors(getUserOverview));
router.get('/:id/tweets', authenticate(), catchErrors(getUserTweets));
router.get(
  '/:id/follow',
  authenticate(),
  followValidation,
  catchErrors(followUser)
);
router.post('/', authenticate(), validUser, catchErrors(postUsers));

router.put('/:id', authenticate(), catchErrors(putUsers));
router.delete('/:id', authenticate(), catchErrors(deleteUsers));

module.exports = router;
