const createSales = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: DataTypes.STRING,
  }, {
    tableName: 'sales',
    underscored: true,
    timestamps: false,
  });

  Sale.associate = (models) => {
    /* models.Sale.belongsTo(models.User, 
      { foreignKey: 'user_id', as: 'client'},
      { foreignKey: 'seller_id', as: 'seller'},
    ); */

    Sale.belongsTo(models.User, 
      { foreignKey: 'user_id', as: 'client'},
    );

    Sale.belongsTo(models.User,
      { foreignKey: 'seller_id', as: 'seller'},
    );

    /* Sale.hasMany(models.SalesProduct, 
      { foreignKey: 'sale_id', as: 'product'},
    ); */
  };

  return Sale;
};

module.exports = createSales;
