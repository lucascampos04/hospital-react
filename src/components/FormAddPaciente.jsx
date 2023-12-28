import React from "react";
import "../public/crudUsersStyle.css"

function FormularioDeAddPaciente({ onClose }) {
  return (
    <form
        className="modal fade show"
        id="form-modal"
        style={{display:"block"}}
        tabIndex="-1"
        role="dialog"
    >
        <p className="closeFormX fw-bold">X</p>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="name" className="form-label">Nome</label>
          <input type="text" className="form-control" id="name_rowOnde" placeholder="Nome" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email_usuario" placeholder="Email" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="campo3" className="form-label">CPF</label>
          <input type="text" className="form-control" id="cpf" placeholder="Cpf" />
        </div>
        <div className="col">
          <label htmlFor="rg" className="form-label">RG</label>
          <input type="text" className="form-control" id="rg" placeholder="Rg" />
        </div>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary"
        id="btn-modal-form"
      >Enviar
      </button>
    </form>
  );
}

export default FormularioDeAddPaciente;
