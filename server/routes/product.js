const express = require('express');
const router = express.Router();

// Middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
// Controllers
const { createProduct, readProduct, updateProduct, deleteProduct,  getInventory } = require('../controllers/product');

router.post('/product', authCheck, adminCheck, createProduct);
router.get('/inventory', getInventory);


module.exports = router;