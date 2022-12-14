const db = require('../database/models');

const salesService = {
  createSale: async ({
    sellerId,
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
  }) => {
    const sale = await db.Sale.create({
      sellerId,
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status: 'Pendente',
    });
    return sale;
  },

  createSalesProduct: async (products, saleId) => {
    products.map(async (product) => {
      const { id, quantity } = product;
      await db.SalesProduct.create({ saleId, productId: id, quantity }); 
    });
  },

  list: async () => {
    const sales = await db.Sale.findAll();
    return sales;
  },

  getByCustomer: async (id) => {
    const sales = await db.Sale.findAll({ where: { userId: id } });
    return sales;
  },

  getBySeller: async (id) => {
    const sales = await db.Sale.findAll({ where: { sellerId: id } });
    return sales;
  },

  getById: async (id) => {
    const sale = await db.Sale.findByPk(id, {
      include: [
        { model: db.User, as: 'client', attributes: { exclude: ['password'] } },
        { model: db.User, as: 'seller', attributes: { exclude: ['password'] } },
        { model: db.Product, as: 'products', through: { attributes: ['quantity'] } },
      ],
      attributes: { exclude: ['userId', 'sellerId'] },
    });

    return sale;
  },

  updateStatus: async (id, status) => {
    const sale = await db.Sale.update({ status }, { where: { id } });

    return sale;
  },
};

module.exports = salesService;