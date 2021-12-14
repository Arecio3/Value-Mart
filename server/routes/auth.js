const express = require('express');
const router = express.Router();

// Middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
// Controllers
const { createOrUpdateUser, currentUser } = require('../controllers/auth');

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);

module.exports = router;