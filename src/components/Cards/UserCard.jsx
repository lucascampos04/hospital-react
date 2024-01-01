import React, { useEffect, useState } from 'react';
import "../../public/crudUsersStyle.css";
import axios from 'axios';
import getBackgroundColorClass from '../EventsModelColors/getBackgroundColorClass';
import FormularioDeAtualizarPaciente from '../FormsAllEventsOfEmployees/FormUpdatePaciente';


function UserCard({ user, onDelete }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const backgroundClass = getBackgroundColorClass(user.planoPaciente);

  // Delete User
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/usuarios/delete/users/${id}`);
      
      if (response.status === 200){
        console.log("Exclusão concluída com sucesso", response.data);
      }
      onDelete();
    } catch (error) {
        console.error("Erro ao excluir usuário ", error);
    }
  };

  // Show Modal UpdateUser
  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowUpdateForm(true);
  };

  // Close modal UpdateUser
  const handleUpdateClose = () => {
    setShowUpdateForm(false);
  };

  return (
    <div className="user-card" onClick={() => setShowUpdateForm(true)}>
      <div className={`card-body ${backgroundClass}`}>
        <span>
          <p className="fw-bold">&nbsp; {user.nome}</p>
          <p className="user-id-model fw-bold">&nbsp; {user.id}</p>
        </span>
        <p className="user-email-model">&nbsp; {user.email}</p>
        <p className="user-telefone-model">&nbsp; {user.telefone}</p>
        <span>
          <p className="user-plano-model">&nbsp; {user.planoPaciente}</p>
          <div className="actionsUser">
            <i
              className="material-icons text-primary"
              id="icon-update-dados-user"
              title='atualizar'
              onClick={handleEditClick}
            >
              system_update_alt 
            </i>
            <i 
              className="material-icons text-danger" 
              id="icon-update-dados-user" 
              title='delete'
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(user.id);
              }}
            >
              delete
            </i>
          </div>
        </span>
      </div>
      {showUpdateForm && (
        <FormularioDeAtualizarPaciente
          onClose={() => handleUpdateClose()}
          usuarioParaAtualizar={user}
        />
      )}
    </div>
  );
}

export default UserCard;
