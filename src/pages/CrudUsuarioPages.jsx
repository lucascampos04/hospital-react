import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormularioDeAddPaciente from "../components/FormsAllEventsOfEmployees/FormAddPaciente"
import "../public/crudUsersStyle.css"
import UserCard from '../components/Cards/UserCard';



function CrudUsuarios() {
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState('');
  const [error, setError] = useState('');
  const [searchUserFromID, setSearchUserFromID] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/usuarios/list/users");
        console.log("Conectado com a rota : http://localhost:8080/api/v1/usuarios/list/users COM SUCESSO");
        console.log(response.data);

        const sortUsersInPlanos = response.data.sort((a, b) => {
          if (a.planoPaciente === "vip" || a.planoPaciente === "gold") {
            return -1;
          } else if (b.planoPaciente === "vip") {
            return 1;
          } else {
            return 0;
          }
        });

        setUsers(sortUsersInPlanos);
      } catch (error) {
        console.error("Erro ao conectar com a rota : http://localhost:8080/api/v1/usuarios/list/users || Erro : " + error);
        setError("Erro ao conectar com o sistema | Erro : " + error);
      }
    };

    fetchData();
  }, []);

  // Função de buscar paciente
const handleSearchUser = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/usuarios/search-from/user/${searchUserFromID}`);
    
    const userWithPlano = response.data;

    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers.filter(user => user.id !== userWithPlano.id), userWithPlano].sort((a, b) => {
        if (a.planoPaciente === "vip" || a.planoPaciente === "gold") {
          return -1;
        } else if (b.planoPaciente === "vip") {
          return 1;
        } else {
          return 0;
        }
      });

      return updatedUsers;
    });
    
    setSearchedUser(userWithPlano);
  } catch (error) {
    alert("Erro ao buscar usuário por ID: ", error);
    setSearchedUser(null);
  }
};

  

  const handleShowAddForm = () => {
    setShowAddForm(true)
  }

  const handleCloseForm = () => {
    setShowAddForm(false)
  }

  const handleDeleteUser = (userID) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userID));
  }
  return (
    <div className='main-model-crud-users'>
      <header>
        <button 
        className='btn btn-primary' 
        id='label_btn_addPaciente'
        onClick={handleShowAddForm}>
          ADICIONAR PACIENTE  <i className="material-icons">accessible</i>
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
          <h1 className='msg-error-to-connect-in-api'>{error}</h1>
        ) : searchedUser ? (
          <UserCard key={searchedUser.id} user={searchedUser} />
        ) : (
          users.map((user) => (
            <UserCard key={user.id} user={user} onDelete={() => handleDeleteUser(user.id)}/>
          ))
        )}
      </main>

      {showAddForm && (
        <div className='form-modal-paciente'>
            <FormularioDeAddPaciente onClose={handleCloseForm}/>
        </div>
      )}

    </div>
  );
}

export default CrudUsuarios;
