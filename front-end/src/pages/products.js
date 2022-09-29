import React, { useContext } from 'react';
// import './products.css';
import { useNavigate } from 'react-router-dom';
import ClientNav from '../components/ClientNav';
import ProductCard from '../components/productCard';
import CartContext from '../context/CartContext';
import useApi from '../hooks/useApi';

function Products() {
  const [products] = useApi('/products', []);
  const { totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div>
      <ClientNav page="customer" />
      <div className="products-list">
        {
          products.map((product, index) => (
            <ProductCard
              key={ index }
              product={ product }
            />
          ))
        }
      </div>
      <button
        type="button"
        data-testid="customer_products__button-cart"
        disabled={ totalPrice === 0 }
        onClick={ () => navigate('/customer/checkout') }
      >
        <span>Ver carrinho</span>
        <span data-testid="customer_products__checkout-bottom-value">
          {`${totalPrice.toFixed(2).replace('.', ',')}`}
        </span>
      </button>
    </div>
  );
}

export default Products;
