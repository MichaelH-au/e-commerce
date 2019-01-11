const models = require('../models')
module.exports = {
    getProducts(req, res) {
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

    },
    addToCart(req, res){
        console.log(req.body)
        models.carts.findOrCreate({
            where: {
                user_id: req.body.user_id,
                product_id: req.body.product_id,
            }
        }).then(value=>{
            if (!value[1]) {
                models.carts.update(
                    {
                        count:parseInt(value[0].count) + 1
                    },
                    {
                        where:{
                            user_id: req.body.user_id,
                            product_id: req.body.product_id,
                        }
                    }
                ).then(value=>{
                    res.json({succ:'update'})
                })
            } else {
                res.json({succ:'new'})
            }
        }).catch(error => {
            console.log(error)
            res.send({error:error})
        })
    }
}