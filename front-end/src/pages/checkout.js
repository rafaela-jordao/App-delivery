import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartCard from '../components/cartCard';
import CartContext from '../context/CartContext';
import useApi from '../hooks/useApi';
import ClientNav from '../components/ClientNav';
import requestApi from '../services/ApiService';
import { readInLocalStorage } from '../services/localStorage';
import '../components/cartCard.css';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const [fullUsers] = useApi('/users', []);
  const sellers = fullUsers.filter(({ role }) => role === 'seller');
  const [sellerId, setSellerId] = useState(2);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = () => {
      const data = readInLocalStorage('user');
      setUser(data);
    };
    getData();
  }, []);

  let total = 0;
  cartItems.forEach((e) => {
    total += e.quantity * e.price;
  });

  const arr = [
    'Item', 'Desc.', 'Quant.',
    'Val. Unit.', 'Sub-total', 'Remover',
  ];

  const sale = {
    sellerId,
    userEmail: user.email,
    totalPrice: total,
    deliveryAddress,
    deliveryNumber,
    products: cartItems,
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    const { saleId } = await requestApi('/sales', 'POST', sale);

    clearCart();
    navigate(`/customer/orders/${saleId}`);
  };

  return (
    <div className="page-checkout">
      <ClientNav page="customer" />
      <h1> Finalizar Pedido </h1>
      <div className="page__element-div">
        <table className="page__element-table">
          <thead>
            <tr>
              {
                arr.map((e) => (
                  <th key={ e }>{ e }</th>
                ))
              }
            </tr>
          </thead>
          <tbody className="cart-card__element-td">
            {
              cartItems.map((order, index) => (
                <tr key={ index } className="cart-card__element-tr">
                  <CartCard
                    index={ index }
                    products={ order }
                    page="checkout"
                    user="customer"
                  />
                </tr>
              ))
            }
          </tbody>
        </table>
        <p
          data-testid="customer_checkout__element-order-total-price"
        >
          {`Total: R$ ${total.toFixed(2).replace('.', ',')}`}
        </p>
      </div>
      <div>
        <h3 className="t2"> Detalhes e Endereço para Entrega </h3>
        <form className="page__element-form" onSubmit={ (e) => handleOrder(e) }>
          <label htmlFor="seller">
            Vendedor(a) Responsável
            <select
              onChange={ ({ target }) => setSellerId(target.value) }
              name="seller"
              value={ sellerId }
              data-testid="customer_checkout__select-seller"
            >
              {
                sellers.map(({ name, id }) => (
                  <option key={ id } value={ id }>{name}</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="address">
            Endereço
            <input
              onChange={ ({ target }) => setDeliveryAddress(target.value) }
              type="text"
              value={ deliveryAddress }
              data-testid="customer_checkout__input-address"
            />
          </label>
          <label htmlFor="address-number">
            Número
            <input
              onChange={ ({ target }) => setDeliveryNumber(target.value) }
              id="address-number"
              type="text"
              value={ deliveryNumber }
              data-testid="customer_checkout__input-address-number"
            />
          </label>
          <button
            className="btn btn-success btn-block"
            data-testid="customer_checkout__button-submit-order"
            type="submit"
          >
            Finalizar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
