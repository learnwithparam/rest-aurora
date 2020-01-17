const express = require('express');

const router = express.Router();
const { catchErrors } = require('../errorHandler');
const { validUser } = require('../validationHandler');

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  loginUsers
} = require('./controller');

router.post('/login', catchErrors(loginUsers));
router.get('/', catchErrors(getUsers));
router.post('/', validUser, catchErrors(postUsers));

router.put('/:id', catchErrors(putUsers));
router.delete('/:id', catchErrors(deleteUsers));

module.exports = router;
