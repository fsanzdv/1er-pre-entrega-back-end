const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/product', productController.createProduct);
router.get('/products', productController.getAllProducts);

module.exports = router;
