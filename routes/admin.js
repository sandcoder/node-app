const express = require('express');
// const path = require('path');

// const rootDir = require('../helpers/path');
const  adminsController = require('../controllers/admin');

const router = express.Router();

router.get('/products',adminsController.getProducts);
router.get('/add-product',adminsController.getAddProduct);
router.post('/add-product',adminsController.postAddProduct);
router.get('/edit-product/:id',adminsController.getEditProduct);
router.post('/edit-product',adminsController.postEditProduct);
router.post('/delete-product',adminsController.postDeleteProduct);

module.exports = router;
// exports.router = router;