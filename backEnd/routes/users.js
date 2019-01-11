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
module.exports = router;