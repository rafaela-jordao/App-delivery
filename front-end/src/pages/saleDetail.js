import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import CartCard from '../components/cartCard';
import './saleDetail.css';
import formatDate from '../helpers/formatDate';
import requestApi from '../services/ApiService';
import ClientNav from '../components/ClientNav';
import useApi from '../hooks/useApi';

const ORDER_ID_PAD = 4;

function SaleDetail({ user }) {
  const { id } = useParams();
  const [sale, updateSale] = useApi(`/sales/${id}`, {}, 1);

  const {
    seller: { name: sellerName } = {},
    saleDate: date,
    products = [],
    status,
    totalPrice,
  } = sale;

  const updateStatus = async (newStatus) => {
    await requestApi(`/sales/${id}`, 'PUT', { status: newStatus });
    updateSale();
  };

  const arr = [
    'Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total',
  ];

  const statusId = `${user}_order_details__element-order-details-label-delivery-status`;
  const sellerDT = `${user}_order_details__element-order-details-label-seller-name`;
  const orderIdDT = `${user}_order_details__element-order-details-label-order-id`;
  const dateDT = `${user}_order_details__element-order-details-label-order-date`;

  return (
    <div>
      <ClientNav page={ user } />
      <h1 className="order-details__element-header">
        Detalhes do Pedido
      </h1>
      <fieldset className="order-details__element-order">
        <div className="order-details__element-order-info">
          <div className="order-details__element-order-info-left">
            <div
              className="order-details__element-order-info-id"
              data-testid={ orderIdDT }
            >
              { `#${id.padStart(ORDER_ID_PAD, 0)}` }
            </div>
            <div
              className={ `order-details__element-order-info-status ${status}` }
              data-testid={ statusId }
            >
              { status }
            </div>
          </div>
          { user === 'customer' && (
            <div
              className="order-details__element-order-seller"
              data-testid={ sellerDT }
            >
              P. Vend:
              {' '}
              { sellerName }
            </div>
          ) }
          <div
            className="order-details__element-order-date"
            data-testid={ dateDT }
          >
            { formatDate(date) }
          </div>
        </div>
        <div className="order-details__element-buttons">
          {
            user === 'customer'
              ? (
                <button
                  type="button"
                  data-testid={ `${user}_order_details__button-delivery-check` }
                  disabled={ status !== 'Em Trânsito' }
                  onClick={ () => updateStatus('Entregue') }
                >
                  Marcar como entregue
                </button>
              )
              : (
                <>
                  <button
                    type="button"
                    data-testid="seller_order_details__button-preparing-check"
                    disabled={ status !== 'Pendente' }
                    onClick={ () => updateStatus('Preparando') }
                  >
                    Preparar pedido
                  </button>
                  <button
                    type="button"
                    data-testid="seller_order_details__button-dispatch-check"
                    disabled={ status !== 'Preparando' }
                    onClick={ () => updateStatus('Em Trânsito') }
                  >
                    Saiu para entrega
                  </button>
                </>
              )
          }
        </div>
      </fieldset>

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
              products.map((order, index) => (
                <tr key={ index } className="cart-card__element-tr">
                  <CartCard
                    index={ index }
                    products={ order }
                    page="order_details"
                    user={ `${user}` }
                  />
                </tr>
              ))
            }
          </tbody>
        </table>
        <p>
          <span>
            {'Total: R$ '}
          </span>
          <span
            data-testid={ `${user}_order_details__element-order-total-price` }
          >
            { String(totalPrice).replace('.', ',') }
          </span>
        </p>
      </div>
      {/* <table>
        <thead>
          <tr>
            {
              arr.map((e) => (
                <th key={ e }>{ e }</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            products.map((order, index) => (
              <tr key={ index }>
                <CartCard
                  index={ index }
                  products={ order }
                  page="order_details"
                  user={ `${user}` }
                />
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        <span>
          {'Total: R$ '}
        </span>
        <span
          data-testid={ `${user}_order_details__element-order-total-price` }
        >
          { String(totalPrice).replace('.', ',') }
        </span>
      </div> */}
    </div>
  );
}

SaleDetail.propTypes = {
  user: PropTypes.string,
}.isRequired;

export default SaleDetail;
