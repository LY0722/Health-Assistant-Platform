module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER
    },
    desc: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2)
    },
    original_price: {
      type: DataTypes.DECIMAL(10, 2)
    },
    stock: {
      type: DataTypes.INTEGER
    },
    sales: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    detail: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'product',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  Product.associate = function(models) {
    Product.belongsTo(models.ProductCategory, { foreignKey: 'category_id' });
    Product.hasMany(models.ProductImage, { foreignKey: 'product_id' });
    Product.hasMany(models.Cart, { foreignKey: 'product_id' });
    Product.hasMany(models.OrderItem, { foreignKey: 'product_id' });
  };

  return Product;
};