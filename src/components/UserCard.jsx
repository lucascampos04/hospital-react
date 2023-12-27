// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import "../public/crudUsersStyle.css"
import getBackgroundColorClass from './getBackgroundColorClass';

function UserCard({ user }) {
  const backgroundClass = getBackgroundColorClass(user.planoPaciente);

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
          <i className="material-icons" id="icon-update-dados-user">
            system_update_alt
          </i>
        </span>
      </div>
    </div>
  );
}

export default UserCard;