var express = require('express');
var router = express.Router();

//Get all user's info
router.get('/', function(req, res, next) {
    res.send({'test':'success'})
})


module.exports = router;