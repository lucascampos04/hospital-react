import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';

function CrudUsuarios() {
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState('');
  const [error, setError] = useState('');
  const [searchUserFromID, setSearchUserFromID] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/usuarios/list/users");
        console.log("Conectado com a rota : http://localhost:8080/api/v1/usuarios/list/users COM SUCESSO");
        console.log(response.data);

        const sortUsersInPlanos = response.data.sort((a, b) => {
          if (a.planoPaciente === "vip" || a.planoPaciente === "gold") {
            return -1;
          } else if (b.planoPaciente === "vip" || b.planoPaciente === "ouro") {
            return 1;
          } else {
            return 0;
          }
        });

        setUsers(sortUsersInPlanos);
      } catch (error) {
        console.error("Erro ao conectar com a rota : http://localhost:8080/api/v1/usuarios/list/users || Erro : " + error);
        setError("Erro ao conectar com o sistema. Erro : " + error);
      }
    };

    fetchData();
  }, []);

  const handleSearchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/usuarios/search-from/user/${searchUserFromID}`);
      setSearchedUser(response.data);
    } catch (error) {
      alert("Erro ao buscar usuário por ID: ", error);
      setSearchedUser(null);
    }
  };

  return (
    <div className='main-model-crud-users'>
      <header>
        <button className='btn btn-primary'>
          ADICIONAR USUARIO  <i className="material-icons">accessible</i>
        </button>
        <div className='header-inputs-containers'>
          <div className="search-input-id-model">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar Usuário"
              value={searchUserFromID}
              onChange={(e) => setSearchUserFromID(e.target.value)}
            />
          </div>
          <i className="material-icons" id='search-id-user' onClick={handleSearchUser}>
            search
          </i>
        </div>
      </header>
      <main className='user-cards-container'>
        {error ? (
          <h1>{error}</h1>
        ) : searchedUser ? (
          <UserCard key={searchedUser.id} user={searchedUser} />
        ) : (
          users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        )}
      </main>
    </div>
  );
}

export default CrudUsuarios;
