module.exports = function (sequelize, dataType) {
    const Product = sequelize.define('product', {
        productName: {
            type: dataType.STRING,
            allowNull: false,
        },
        imagePath: {
            type: dataType.STRING,
            allowNull: false
        },
        productPrice: {
            type: dataType.INTEGER,
            allowNull: false
        },
        category:{
            type: dataType.STRING,
        }
    }, {
        underscored: true
    });
    Product.associate = (models) => {
        Product.belongsToMany(models.user, {through: 'carts'});
    };
    return Product;
};

