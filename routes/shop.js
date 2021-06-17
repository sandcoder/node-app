const express = require('express');

const  shopsController = require('../controllers/shop');

const router = express.Router();

router.get('/',shopsController.getIndex);
router.get('/products',shopsController.getProducts);
router.get('/products/:id',shopsController.getProduct);
router.get('/cart',shopsController.getCart);
router.post('/cart',shopsController.postCart);
router.post('/cart-delete-item',shopsController.postCartDeleteCartItem);
router.get('/orders',shopsController.getOrders);
router.post('/create-order',shopsController.postCreateOrder);
router.get('/checkout',shopsController.getCheckout);

module.exports = router;