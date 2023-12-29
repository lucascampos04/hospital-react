// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import "../public/crudUsersStyle.css"
import getBackgroundColorClass from './getBackgroundColorClass';
import axios from 'axios';

function UserCard({ user, onDelete }) {
  const backgroundClass = getBackgroundColorClass(user.planoPaciente);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/usuarios/delete/users/${id}`)
      
      if (response.status === 200){
        console.log("Exclusão concluida com sucesso", response.data)
      }
      onDelete()
    } catch (error) {
        console.error("erro ao excluir usuário " , error)
    }
  }

  return (
    <div className="user-card">
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
            <i className="material-icons text-primary" id="icon-update-dados-user" title='atualizar'>
              system_update_alt 
            </i>
            <i 
            className="material-icons text-danger" 
            id="icon-update-dados-user" 
            title='delete'
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(user.id)
            }}
            >
              delete
            </i>
          </div>
          
        </span>
      </div>
    </div>
  );
}

export default UserCard;