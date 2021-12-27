const express = require('express');
const router = express.Router();

// Middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
// Controllers
const { createProduct, readProduct, updateProduct, deleteProduct, listProduct } = require('../controllers/product');

router.post('/product', authCheck, adminCheck, createProduct);


module.exports = router;