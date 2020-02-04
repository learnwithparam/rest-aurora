const express = require('express');

const router = express.Router();
const { catchErrors } = require('../errorHandler');
const { authenticate } = require('../auth');

const {
  postUsers,
  loginUsers,
  deleteUsers,
  getUserTweets
} = require('./controller');

router.post('/login', catchErrors(loginUsers));

router.post('/', authenticate(), catchErrors(postUsers));
router.delete('/:id', authenticate(), catchErrors(deleteUsers));

// TODO: endpoint to get tweet of an user

module.exports = router;
