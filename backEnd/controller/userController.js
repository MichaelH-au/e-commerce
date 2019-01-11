var models = require('../models')

module.exports = {
    create_user(req, res) {

        //TODO validation and password encryption
        models.user.create({
            userName: req.body.username,
            Password: req.body.password,
            Role: req.body.role,
            Gender: req.body.gender,
            Date_of_birth: req.body.birthday,
            Address: req.body.address,
            Email_address: req.body.email,
            Phone_number: req.body.phone,
        }).then(function (value) {
            if (value) {
                console.log('success')
                res.json({data: 'success'});
            }
        }).catch(function (reason) {
            console.log(reason);
            res.json({error: reason});
        });
    },
    login(req, res) {
        models.user.find({
            where: {
                userName: req.body.username,
                Password: req.body.password
            },
            include: {
                model: models.product,
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('productName')), 'items']],
                through: {
                    where: {status: 'pending'}
                }
            }
        }).then(data => {
            // console.log(data.products)
            if (data) {
                //TODO cookie
                // res.cookie('userId', data.dataValues.id)
                res.json({data: data})
            } else {
                res.json({error: 'invalid username or password'})
            }
        }).catch(error => {
            console.log(error)
        })

    },
    getCartItems(req, res) {
        console.log(req.query)
        models.user.findOne({
            where: {
                id: req.query.user_id
            },
            include: {
                model: models.product,
                attributes: ['id', 'productName', 'imagePath', 'productPrice'],
                through: {
                    where: {status: 'pending'}
                }
            }
        }).then(value => {
            console.log(value)
            res.json({data: value.products})
        }).catch(error => {
            console.log(error)
            res.json({error})
        })
    },
    updateCart(req, res) {
        models.carts.update(
            {count:req.body.count},
            {
                where:{
                    user_id:req.body.user_id,
                    product_id:req.body.product_id
                }
            }
        ).then(value =>{
            res.json({status:'success'})
        }).catch(error => {
            res.json({error})
        })
    }
}