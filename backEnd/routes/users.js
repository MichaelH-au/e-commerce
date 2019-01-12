const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
//Get all user's info
router.get('/', function(req, res, next) {
    res.send({'test':'success'})
})

router.post('/register', function(req, res, next) {
    userController.create_user(req,res)
})

router.post('/login', function(req, res, next) {
    userController.login(req,res)
})

router.get('/cart', function(req, res, next) {
    userController.getCartItems(req, res)
})

router.post('/cart/update', function(req, res, next) {
    userController.updateCart(req,res)
})

router.post('/cart/delete', function(req, res, next) {
    userController.deleteCartItem(req,res)
})

router.post('/cart/selectAll', function(req, res, next) {
    userController.selectAllCartItem(req,res)
})

router.get('/address', function(req, res, next) {
    userController.getAddress(req, res)
})


router.post('/address/delete', function(req, res, next) {
    userController.deleteAddress(req,res)
})
module.exports = router;