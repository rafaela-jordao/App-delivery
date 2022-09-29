const { expect } = require('chai');
const sinon = require('sinon');
const productController = require('../controllers/productsController');
const productService = require('../services/productsServices');

const res = {};

const products =  [
  {
    name: 'Skol Lata 250ml',
    price: 2.20,
    url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg'
  },
  {
    name: 'Heineken 600ml',
    price: 7.50,
    url_image: 'http://localhost:3001/images/heineken_600ml.jpg'
  },
  {
    name: 'Antarctica Pilsen 300ml',
    price: 2.49,
    url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg'
  },
];

describe('Testando a camada controller', () => {
    it('Testando retorno da função com os respectivos produtos', () => {
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
})