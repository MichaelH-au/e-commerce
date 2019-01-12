module.exports = function (sequelize, dataType) {
    const address = sequelize.define('address', {
        userInfo: {
            type: dataType.INTEGER,
            allowNull: false
        },
        contactName: {
            type: dataType.STRING,
            allowNull: false,
        },
        address: {
            type: dataType.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: dataType.STRING,
            allowNull: false
        },
        postCode: {
            type: dataType.INTEGER,
            allowNull: false
        },
        isDefault: {
            type: dataType.INTEGER,
            defaultValue:0,
            allowNull: false
        },
    }, {
        underscored: true
    });
    address.associate = (models) => {
        address.belongsTo(models.user, {foreignKey: 'userInfo'});
    };
    return address;
};


