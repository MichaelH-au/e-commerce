var express = require('express');
var router = express.Router();
var models = require('../models')

//Get all product's info
router.get('/', function(req, res, next) {
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset)
    let selectedRange = req.query.selectedRange;
    let priceGr = '';
    let priceLte = ''
    let param = {
        offset:offset,
        limit:limit
    }

    if (selectedRange != 'all') {
        switch (selectedRange) {
            case '0':
                priceGr = 0;
                priceLte = 500
                break;
            case '1':
                priceGr = 500;
                priceLte = 1000
                break;
            case '2':
                priceGr = 1000;
                priceLte = 5000
                break;
            default:
                break;
        }
        param.where = {
            productPrice:{
                [models.Sequelize.Op.between]: [priceGr, priceLte]
            }
        }
    }
    models.product.findAll(param).then(values =>{
        res.json({status:0, msg:'', result:values})
    })
})


module.exports = router;