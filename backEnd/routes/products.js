const express = require('express');
const router = express.Router();
const models = require('../models')
const productController = require('../controller/productController')

//Get all product's info
router.get('/', function(req, res, next) {
    productController.getProducts(req,res)
})


router.post('/addCart', function(req, res, next) {
    productController.addToCart(req,res)
})


module.exports = router;