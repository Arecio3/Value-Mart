const express = require('express');
const router = express.Router();

// Middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
// Controllers
const { createSub, readSub, updateSub, deleteSub, listSub } = require('../controllers/sub');

router.post('/sub', authCheck, adminCheck, createSub);
router.get('/subs', listSub);
router.get('/sub/:slug', readSub);
router.put('/sub/:slug', authCheck, adminCheck, updateSub);
router.delete('/sub/:slug', authCheck, adminCheck, deleteSub);

module.exports = router;