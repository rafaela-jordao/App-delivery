import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import CartCard from '../components/cartCard';
import formatDate from '../helpers/formatDate';
import requestApi from '../services/ApiService';
import ClientNav from '../components/ClientNav';
import useApi from '../hooks/useApi';

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
  const sallerDT = `${user}_order_details__element-order-details-label-seller-name`;

  return (
    <div>
      <ClientNav page={ user } />
      <h1>
        Detalhes do Pedido
      </h1>
      <fieldset>
        <div
          data-testid={ `${user}_order_details__element-order-details-label-order-id` }
        >
          PEDIDO
          {' '}
          { id }
        </div>
        { user === 'customer' && (
          <div
            data-testid={ sallerDT }
          >
            Vendedor
            {' '}
            { sellerName }
          </div>
        ) }
        <div
          data-testid={ `${user}_order_details__element-order-details-label-order-date` }

        >
          data
          {' '}
          { formatDate(date) }
        </div>
        <div
          data-testid={ statusId }
        >
          status
          {' '}
          { status }
        </div>
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
      </fieldset>
      <table>
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
      </div>
    </div>
  );
}

SaleDetail.propTypes = {
  user: PropTypes.string,
}.isRequired;

export default SaleDetail;
