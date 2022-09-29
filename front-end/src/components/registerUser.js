import React, { useEffect, useState } from 'react';
import requestApi from '../services/ApiService';

const MIN_PASS_LENGTH = 6;
const MIN_NAME_LENGTH = 12;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

function RegisterUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
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
  };

  return (
    <div>
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
      <label htmlFor="type">
        Tipo
        <select
          data-testid="admin_manage__select-role"
          onChange={ ({ target }) => setRole(target.value) }
        >
          <option value="administrator"> Administrador </option>
          <option value="seller"> P. Vendedora </option>
          <option value="customer"> Cliente </option>
        </select>
      </label>
      <button
        type="submit"
        onClick={ (e) => handleRegisterUser(e) }
        disabled={ disabled }
        data-testid="admin_manage__button-register"
      >
        Cadastrar
      </button>
    </div>
  );
}

export default RegisterUser;
