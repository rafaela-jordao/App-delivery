import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import CartContext from '../context/CartContext';
import './productCard.css';

function ProductCard({ product }) {
  const { cartItems, addToCart, removeFromCart, setToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const getCart = () => {
      const prod = cartItems.find((e) => e.id === product.id);
      setQuantity(prod ? prod.quantity : 0);
    };
    getCart();
  }, []);

  const add = () => {
    setQuantity(Number(quantity) + 1);
    addToCart(product);
  };

  const sub = () => {
    if (quantity > 0) {
      setQuantity(Number(quantity) - 1);
      removeFromCart(product);
    }
  };

  const handleInput = ({ target }) => {
    const value = Number.isNaN(Number(target.value)) ? 0 : target.value;
    setQuantity(value);
    setToCart(product, value);
  };

  const { name, price, urlImage } = product;

  return (
    <div className="product-card" data-testid="product">
      <section className="product-card__element-info">
        <div
          className="product-card__element-info-name"
          data-testid={ `customer_products__element-card-title-${product.id}` }
        >
          { name }

        </div>
        <div className="product-card__element-info-price">
          <span>R$</span>
          <span data-testid={ `customer_products__element-card-price-${product.id}` }>
            { price.replace('.', ',') }
          </span>
        </div>
      </section>
      <section className="product-card__element-image">
        <img
          data-testid={ `customer_products__img-card-bg-image-${product.id}` }
          src={ urlImage }
          alt={ name }
          width="50"
        />
      </section>
      <section className="product-card__element-control">
        <button
          className="product-card__element-control-button"
          data-testid={ `customer_products__button-card-add-item-${product.id}` }
          type="button"
          onClick={ add }
        >
          +
        </button>
        <input
          className="product-card__element-control-input"
          onChange={ handleInput }
          type="number"
          min="0"
          value={ quantity }
          data-testid={ `customer_products__input-card-quantity-${product.id}` }
        />
        <button
          className="product-card__element-control-button"
          data-testid={ `customer_products__button-card-rm-item-${product.id}` }
          type="button"
          onClick={ sub }
        >
          -
        </button>
      </section>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
