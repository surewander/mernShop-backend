const express = require('express');
const { isAuth } = require('../Middlewares/authMiddlewares');

const cartController = require('../Controllers/cartController')

const router = express.Router();

router.post('/add-to-cart',isAuth,cartController.addToCart)
router.get('/cart',isAuth,cartController.getCart)

module.exports = router;