const express = require('express');

const router = express.Router();
const { catchErrors } = require('../errorHandler');

const { postUsers, loginUsers, deleteUsers } = require('./controller');

router.post('/login', catchErrors(loginUsers));

// TODO: Authenticate and protect the add and delete user endpoints
router.post('/', catchErrors(postUsers));
router.delete('/:id', catchErrors(deleteUsers));

module.exports = router;
