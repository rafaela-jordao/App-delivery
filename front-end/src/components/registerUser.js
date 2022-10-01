import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import requestApi from '../services/ApiService';

const MIN_PASS_LENGTH = 6;
const MIN_NAME_LENGTH = 12;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

function RegisterUser({ update }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [disabled, setDisabled] = useState(true);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    const validName = name.length >= MIN_NAME_LENGTH;
    const validEmail = EMAIL_REGEX.test(email);
    const validPassword = password.length >= MIN_PASS_LENGTH;
    const buttonEnabled = validEmail && validPassword && validName;
    setDisabled(!buttonEnabled);
  }, [name, email, password]);

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    try {
      await requestApi(
        '/users',
        'POST',
        { name, email, password, role },
      );
    } catch (error) {
      console.log(error);
      setMessageError(true);
    }
    update();
  };

  return (
    <div className="page">
      <form
        onSubmit={ (e) => handleRegisterUser(e) }
        className="form2"
      >
        {
          messageError && (
            <span data-testid="admin_manage__element-invalid-register">
              Usuário já cadastrado!
            </span>
          )
        }
        <label htmlFor="name">
          Nome
          <input
            type="text"
            data-testid="admin_manage__input-name"
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            data-testid="admin_manage__input-email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="pass">
          Senha
          <input
            type="password"
            data-testid="admin_manage__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
      </form>
      <form
        onSubmit={ (e) => handleRegisterUser(e) }
        className="form2"
      >
        <label
          className="select"
          htmlFor="type"
        >
          <span>Tipo</span>
          <select
            data-testid="admin_manage__select-role"
            value={ role }
            onChange={ ({ target }) => setRole(target.value) }
          >
            <option value="administrator"> Administrador </option>
            <option value="seller"> P. Vendedora </option>
            <option value="customer"> Cliente </option>
          </select>
        </label>
        <button
          type="submit"
          disabled={ disabled }
          data-testid="admin_manage__button-register"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

RegisterUser.propTypes = {
  update: PropTypes.func.isRequired,
};

export default RegisterUser;
