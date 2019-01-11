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
}