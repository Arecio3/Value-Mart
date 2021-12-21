const express = require('express');
const router = express.Router();

// Middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
// Controllers
const { createCat, readCat, updateCat, deleteCat, listCat } = require('../controllers/category');

router.post('/category', authCheck, adminCheck, createCat);
router.get('/categories', listCat);
router.get('/category/:slug', readCat);
router.put('/category/:slug', authCheck, adminCheck, updateCat);
router.delete('/category/:slug', authCheck, adminCheck, deleteCat);

module.exports = router;