const { expect } = require('chai');
const sinon = require('sinon');
const salesController = require('../controllers/salesController');
const salesService = require('../services/salesService');

const res = {};

const sales = [
  {
    id: 01,
    sellerName: Fulana Pereira,
    userEmail: zebirita@email.com,
    totalPrice: 20,
    deliveryAddress: rua lalaal,
    deliveryNumber: 123,
    products: [
			{ productId: 4, name: sasa, quantity: 1, unitPrice: 2, subTotal: 2 },
   		{ productId: 5, name: sdsdsda, quantity: 2, unitPrice: 3, subTotal: 6 },
   		{ productId: 8, name: stytytyt, quantity: 3, unitPrice: 4, subTotal: 12 }
	]
 },
 {
  id: 02,
  sellerName: Ciclana Joaquina,
  userEmail: ciclana@email.com,
  totalPrice: 15,
  deliveryAddress: rua absced,
  deliveryNumber: 12345,
  products: [
    { productId: 4, name: sasa, quantity: 1, unitPrice: 2, subTotal: 2 },
     { productId: 5, name: sdsdsda, quantity: 2, unitPrice: 3, subTotal: 6 },
     { productId: 8, name: stytytyt, quantity: 3, unitPrice: 4, subTotal: 12 }
]
}
];

describe('Testando a camada controller do componente sales', () => {
  decribe('Testando a Função list', () => {
    it('Testando retorno da função com os respectivos sales', () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productService, 'findAll').resolves(products);
      });
  
      after(() => {
        productService.getAll.restore();
      });
  
      it('Testando status  200', async () => {
        await productController.list(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
    });
  }),
  decribe('Testando a função getById', () => {
    before(() => {
      req.params = { id: 1 };
      const saleId = [
        {
          id: 01,
          sellerName: Fulana Pereira,
          userEmail: zebirita@email.com,
          totalPrice: 20,
          deliveryAddress: rua lalaal,
          deliveryNumber: 123,
          products: [
            { productId: 4, name: sasa, quantity: 1, unitPrice: 2, subTotal: 2 },
             { productId: 5, name: sdsdsda, quantity: 2, unitPrice: 3, subTotal: 6 },
             { productId: 8, name: stytytyt, quantity: 3, unitPrice: 4, subTotal: 12 }
        ]
       }
      ];
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'findByPk').resolves([saleId]);
    });

    after(() => {
      salesService.getAll.restore();
    });

    it('status 200', async () => {
      await salesController.productsGetId(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  })
})