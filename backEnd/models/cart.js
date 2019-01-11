module.exports = function (sequelize, dataType) {
    return sequelize.define('carts', {
        user_id: {
            type: dataType.INTEGER,
            allowNull: false
        },
        product_id: {
            type: dataType.INTEGER,
            allowNull: false
        },
        count: {
            type: dataType.STRING,
            allowNull: false
        },
        status: {
            type: dataType.STRING,
            defaultValue: 'pending',
            allowNull: false
        },
    }, {
        underscored: true,
        tableName: 'carts'
    });
};

