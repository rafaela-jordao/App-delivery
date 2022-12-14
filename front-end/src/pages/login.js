import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { readInLocalStorage, saveInLocalStorage } from '../services/localStorage';
import requestApi from '../services/ApiService';
import './login.css';

const MIN_PASS_LENGTH = 6;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    const verifyUser = () => {
      const user = readInLocalStorage('user');
      if (user) {
        let nav = '';
        if (user.role === 'customer') {
          nav = '/customer/products';
        } else if (user.role === 'seller') {
          nav = '/seller/orders';
        } else {
          nav = '/admin/manage';
        }
        return navigate(nav);
      }
    };
    verifyUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const validEmail = EMAIL_REGEX.test(email);
    const validPassword = password.length >= MIN_PASS_LENGTH;
    const buttonEnabled = validEmail && validPassword;
    setDisabled(!buttonEnabled);
  }, [email, password]);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await requestApi('/login', 'POST', { email, password });
      saveInLocalStorage('user', data);
      let nav = '';
      if (data.role === 'customer') {
        nav = '/customer/products';
      } else if (data.role === 'seller') {
        nav = '/seller/orders';
      } else {
        nav = '/admin/manage';
      }
      navigate(nav);
    } catch (error) {
      console.log(error);
      setMessageError(true);
    }
  }

  function handleRegister() {
    // Levar para pagina de registro
    navigate('/register');
  }

  return (
    <div className="body">
      <img src="/APP DE Delivery.png" alt="logo Bear Delivery" />
      <form
        onSubmit={ (e) => handleLogin(e) }
        className="form1"
      >
        <input
          className=""
          onChange={ ({ target }) => setEmail(target.value) }
          placeholder="E-mail"
          type="email"
          value={ email }
          data-testid="common_login__input-email"
        />
        <input
          onChange={ ({ target }) => setPassword(target.value) }
          placeholder="Password"
          type="password"
          value={ password }
          data-testid="common_login__input-password"
        />
        <button
          className="btn btn-success btn-block"
          data-testid="common_login__button-login"
          disabled={ disabled }
          type="submit"
        >
          Login
        </button>
        <button
          className="btn btn-success btn-block"
          data-testid="common_login__button-register"
          onClick={ () => handleRegister() }
          type="button"
        >
          Registrar
        </button>
        {
          messageError && (
            <p
              data-testid="common_login__element-invalid-email"
            >
              Credenciais inv??lidas
            </p>
          )
        }
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;

export default Login;
