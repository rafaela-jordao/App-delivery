import React from 'react';
import ClientNav from '../components/ClientNav';
import RegisterUser from '../components/registerUser';
import useApi from '../hooks/useApi';
import requestApi from '../services/ApiService';

function Admin() {
  const [fullUsers, updateUsers] = useApi('/users', [], 1);

  const users = fullUsers.filter(({ role }) => role !== 'administrator');

  const columns = [
    'Item', 'Nome', 'E-mail',
    'Tipo', 'Excluir',
  ];

  const itemNumber = (index) => `admin_manage__element-user-table-item-number-${index}`;

  const removeUser = async (e, id) => {
    e.preventDefault();
    // CONFIRMAR ROTA NO BACK > req41
    await requestApi(`/users/${id}`, 'DELETE');
    updateUsers();
  };

  return (
    <div>
      <ClientNav page="administrator" />
      <h1> Cadastrar novo usuário </h1>
      <RegisterUser />

      <h1> Lista de usuários </h1>
      <table>
        <thead>
          <tr>
            {
              columns.map((e) => (
                <th key={ e }>{ e }</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            users.map(({ id, name, email, role }, index) => (
              <tr key={ id }>
                <td data-testid={ itemNumber(index) }>
                  { index + 1 }
                </td>
                <td data-testid={ `admin_manage__element-user-table-name-${index}` }>
                  { name }
                </td>
                <td data-testid={ `admin_manage__element-user-table-email-${index}` }>
                  { email }
                </td>
                <td data-testid={ `admin_manage__element-user-table-role-${index}` }>
                  { role }
                </td>
                <td data-testid={ `admin_manage__element-user-table-remove-${index}` }>
                  <button
                    type="submit"
                    onClick={ (e) => removeUser(e, id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
