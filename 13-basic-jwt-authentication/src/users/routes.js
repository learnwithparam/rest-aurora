const express = require('express');

const router = express.Router();
const { catchErrors } = require('../errorHandler');

const { postUsers, loginUsers } = require('./controller');

// TODO 1: Create routes to register and login users
// TODO 2: Delete endpoint

module.exports = router;
