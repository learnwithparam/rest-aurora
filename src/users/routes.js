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
  loginUsers
} = require('./controller');

router.post('/login', catchErrors(loginUsers));
router.get('/', authenticate(), catchErrors(getUsers));
router.post('/', authenticate(), validUser, catchErrors(postUsers));

router.put('/:id', authenticate(), catchErrors(putUsers));
router.delete('/:id', authenticate(), catchErrors(deleteUsers));

module.exports = router;
