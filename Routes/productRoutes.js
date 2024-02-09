const express = require('express');
const { isAuth } = require('../Middlewares/authMiddlewares');
const productController = require('../Controllers/productController')
const router = express.Router();

router.get('/products',isAuth,productController.getProducts)
router.post('/add-product',isAuth,productController.addProduct)

module.exports = router;