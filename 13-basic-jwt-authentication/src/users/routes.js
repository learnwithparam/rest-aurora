const express = require('express');

const router = express.Router();
const { catchErrors } = require('../errorHandler');

const { postUsers, loginUsers } = require('./controller');

// TODO: Create routes to register and login users

// TODO: Use auth middlewares and show example

// TODO: Delete endpoint

module.exports = router;
