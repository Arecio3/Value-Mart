const express = require('express');
const router = express.Router();

// Controllers
const { createOrUpdateUser } = require('../controllers/auth');

// Middlewares
const { authCheck } = require('../middlewares/auth');


router.post('/create-or-update-user', authCheck, createOrUpdateUser);

module.exports = router;