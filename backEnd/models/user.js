module.exports = function (sequelize, dataType) {
    const User = sequelize.define('user', {
        userName: {
            type: dataType.STRING,
            allowNull: false,
            unique: true
        },
        Password: {
            type: dataType.STRING,
            allowNull: false
        },
        Role: {
            type: dataType.ENUM('user', 'shop_owner'),
            allowNull: false
        },
        Gender: {
            type: dataType.ENUM('Male', 'Female'),
            allowNull: false
        },
        Date_of_birth: {
            type:dataType.DATE,
            allowNull: false
        },
        Address: {
            type: dataType.STRING,
            allowNull: false
        },
        Email_address: {
            type: dataType.STRING,
            allowNull: false
        },
        Phone_number: {
            type: dataType.INTEGER,
            allowNull: false
        },
    }, {
        underscored: true
    });
    User.associate = (models) => {
        User.belongsToMany(models.product, {through: 'carts'});
        User.hasMany(models.address, {as: 'userInfo', foreignKey: 'userInfo'});
    }
    return User;
};
