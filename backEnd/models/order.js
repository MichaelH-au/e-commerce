module.exports = function (sequelize, dataType) {
    const order = sequelize.define('order', {
        orderId: {
            type: dataType.STRING,
            allowNull: false
        },

        orderOwner: {
            type: dataType.INTEGER,
            allowNull: false
        },
        orderAmount: {
            type: dataType.INTEGER,
            allowNull: false,
        },
        addressInfo: {
            type: dataType.INTEGER,
            allowNull: false,
        },
        status: {
            type: dataType.STRING,
            defaultValue:'pending',
            allowNull: false
        },
        orderInfo: {
            type: dataType.TEXT,
            allowNull: false
        },
    }, {
        underscored: true
    });
    order.associate = (models) => {
        order.belongsTo(models.user, {foreignKey: 'orderOwner'});
        order.belongsTo(models.address, {foreignKey: 'addressInfo'});
    };
    return order;
};


