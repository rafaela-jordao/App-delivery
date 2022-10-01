import ClientNav from '../components/ClientNav';
import RegisterUser from '../components/registerUser';
import UserCard from '../components/userCart';
import useApi from '../hooks/useApi';

function Admin() {
  const [fullUsers, updateUsers] = useApi('/users', [], 1);

  return (
    <div>
      <ClientNav page="administrator" />
      <h2> Cadastrar novo usuário </h2>
      <RegisterUser update={ updateUsers } />

      <h2> Lista de usuários </h2>
      <div className="diplay-cards">
        {
          fullUsers.map((item, index) => <UserCard key={ index } user={ item } index />)
        }
      </div>
    </div>
  );
}

export default Admin;
