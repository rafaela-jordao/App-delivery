import React, { useContext } from 'react';
import './products.css';
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
      <main className="products_page__container">
        {
          products.map((product, index) => (
            <ProductCard
              key={ index }
              product={ product }
            />
          ))
        }
      </main>
      <button
        className="products_page__cart-button"
        type="button"
        data-testid="customer_products__button-cart"
        disabled={ totalPrice === 0 }
        onClick={ () => navigate('/customer/checkout') }
      >
        <div className="products_page__cart-button-text">Ver carrinho</div>
        <div className="products_page__cart-button-value">
          <span>R$</span>
          <span data-testid="customer_products__checkout-bottom-value">
            {`${totalPrice.toFixed(2).replace('.', ',')}`}
          </span>
        </div>
      </button>
    </div>
  );
}

export default Products;
