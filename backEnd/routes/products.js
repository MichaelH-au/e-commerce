var express = require('express');
var router = express.Router();
var models = require('../models')

//Get all product's info
router.get('/', function(req, res, next) {
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset)
    console.log('load')
    models.product.findAll({
        offset:offset,
        limit:limit
    }).then(values =>{
        res.json({status:0, msg:'', result:values})
    })
})


module.exports = router;