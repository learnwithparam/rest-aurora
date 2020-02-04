const express = require('express');

const router = express.Router();
const { catchErrors } = require('../errorHandler');
const { authenticate } = require('../auth');

const { postUsers, loginUsers, deleteUsers } = require('./controller');

router.post('/login', catchErrors(loginUsers));

router.post('/', authenticate(), catchErrors(postUsers));
router.delete('/:id', authenticate(), catchErrors(deleteUsers));

module.exports = router;
