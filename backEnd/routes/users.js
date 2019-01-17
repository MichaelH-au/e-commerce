const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
//Get all user's info
router.get('/', function(req, res, next) {
    res.send({'test':'success'})
})

/**
 * Router with user info
 * */
router.post('/register', function(req, res, next) {
    userController.create_user(req,res)
})

router.post('/login', function(req, res, next) {
    userController.login(req,res)
})

router.get('/logout', function(req, res, next) {
    userController.logout(req,res)
})

router.get('/userInfo', function(req, res, next) {
    userController.user_info(req, res)
})


/**
 * router with user'cart
 * */
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


/**
 * Router with user's address
 * */
router.get('/address', function(req, res, next) {
    userController.getAddress(req, res)
})

router.post('/address/setDefault', function(req, res, next) {
    userController.setDefaultAddress(req,res)
})

router.post('/address/delete', function(req, res, next) {
    userController.deleteAddress(req,res)
})

router.post('/address/create', function(req, res, next) {
    userController.createAddress(req,res)
})

/**
 * Router with user's order
 * */

router.post('/order/create', function(req, res, next) {
    userController.createOrder(req,res)
})
router.get('/order', function(req, res, next) {
    userController.getOrder(req,res)
})
module.exports = router;