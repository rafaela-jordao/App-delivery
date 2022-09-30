import React from 'react';
import PropTypes from 'prop-types';
import './ClientNav.css';
import { useNavigate } from 'react-router-dom';
import { readInLocalStorage, removeInLocalStorage } from '../services/localStorage';
import NavLink from './navLink';

function ClientNav({ page }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeInLocalStorage('user');
    navigate('/login');
  };

  let navLinks;

  switch (page) {
  case 'customer':
    navLinks = (
      <>
        <NavLink
          className="nav-link"
          to="/customer/orders"
          testid="customer_products__element-navbar-link-orders"
          text="Meus Pedidos"
        />
        <NavLink
          className="nav-link"
          to="/customer/products"
          testid="customer_products__element-navbar-link-products"
          text="Produtos"
        />
      </>
    );
    break;
  case 'seller':
    navLinks = (
      <NavLink
        to="/seller/orders"
        testid="customer_products__element-navbar-link-orders"
        text="Meus Pedidos"
      />
    );
    break;
  case 'administrator':
    navLinks = (
      <NavLink
        to="/admin/orders" // ?????
        testid="customer_products__element-navbar-link-orders"
        text="Gerenciar Usuários"
      />
    );
    break;
  default:
    navLinks = null;
  }

  return (
    <header className="fixed">
      <nav>
        <div className="nav-itens">
          { navLinks }
        </div>
        <div className="nav-user">
          <div>
            <span data-testid="customer_products__element-navbar-user-full-name">
              { readInLocalStorage('user').name }
            </span>
          </div>
          <div>
            <button
              type="button"
              onClick={ handleLogout }
              data-testid="customer_products__element-navbar-link-logout"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

ClientNav.propTypes = {
  page: PropTypes.string.isRequired,
};

export default ClientNav;
