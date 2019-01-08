var express = require('express');
var router = express.Router();
var models = require('../models')

//Get all product's info
router.get('/', function(req, res, next) {
    models.product.findAll({

    }).then(values =>{
        console.log(values[0].dataValues)
        res.json({status:0, msg:'', result:values})
    })
})


module.exports = router;