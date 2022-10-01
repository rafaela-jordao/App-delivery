import PropTypes from 'prop-types';
import requestApi from '../services/ApiService';
import './userCard.css';

function UserCard({ user, index }) {
  const { name, email, id, role } = user;
  const removeUser = async (e, userId) => {
    e.preventDefault();
    await requestApi(`/users/${userId}`, 'DELETE');
    updateUsers();
  };

  return (
    <fieldset className="card">
      <fieldset className="block">
        <div
          className="cub1"
          data-testid={ `admin_manage__element-user-table-item-number-${index}` }
        >
          Id:
          {' '}
          { `${id}` }
        </div>
        <div
          className="cub2"
          data-testid={ `admin_manage__element-user-table-name-${index}` }
        >
          Nome:
          {' '}
          { name }
        </div>
        <div
          data-testid={ `admin_manage__element-user-table-email-${index}` }
        >
          Email:
          {' '}
          { email }
        </div>
        <div
          className="cub5"
          data-testid={ `admin_manage__element-user-table-role-${index}` }
        >
          Tipo:
          {' '}
          { role }
        </div>
      </fieldset>
      <div className="cub">
        <button
          type="submit"
          data-testid={ `admin_manage__element-user-table-remove-${index}` }
          onClick={ (e) => removeUser(e, id) }
        >
          <img
            className="lixo"
            src="/trash.png"
            alt="logo Bear Delivery"
          />
        </button>
      </div>
    </fieldset>
  );
}

UserCard.propTypes = {
  index: PropTypes.number,
  user: PropTypes.object,
}.isRequired;

export default UserCard;
