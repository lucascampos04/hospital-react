import React, { useState, useEffect } from "react";
import "../../public/crudUsersStyle.css";
import axios from "axios";

function FormularioDeAtualizarPaciente({ onClose, usuarioParaAtualizar }) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const [formDataPaciente, setformDataPaciente] = useState({
    nome: "",
    password : "",
    email: "",
    cpf: "",
    rg: "",
    telefone: "",
    genero: "",
    planoPaciente: "",
    dataNascimento: "",
  });

  const [validationDataFormPaciente, setvalidationDataFormPaciente] = useState({});

  useEffect(() => {
    if (usuarioParaAtualizar) {
      setformDataPaciente(usuarioParaAtualizar);
    }
  }, [usuarioParaAtualizar]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "cpf") {
      const formattedCPF = formatCPF(e.target.value);
      setformDataPaciente({
        ...formDataPaciente,
        [id]: value,
        formattedCPF,
      });
    } else if (id === "email") {
      setformDataPaciente({
        ...formDataPaciente,
        [id]: id === "email" ? value : value.trim(),
      });
    } else if (id === "rg") {
      const formattedRG = formatRG(e.target.value);
      setformDataPaciente({
        ...formDataPaciente,
        [id]: formattedRG,
      });
    } else {
      setformDataPaciente({
        ...formDataPaciente,
        [id]: value,
      });
    }
  };

  const formatCPF = (value) => {
    const cleanedValue = value && typeof value === "string" ? value.replace(/\D/g, "") : "";
    const cpfArray = cleanedValue.split("");

    cpfArray.splice(3, 0, ".");
    cpfArray.splice(7, 0, ".");
    cpfArray.splice(11, 0, "-");

    return cpfArray.join("").substring(0, 14);
  };

  const formatRG = (value) => {
    const cleanedValue = value && typeof value === "string" ? value.replace(/\D/g, "") : "";
    const rgArray = cleanedValue.split("");

    rgArray.splice(3, 0, ".");
    rgArray.splice(6, 0, ".");

    return rgArray.join("").substring(0, 12);
  };

  const validateNome = () => {
    if (!/^[A-Za-z\s]+$/.test(formDataPaciente.nome)) {
      return "O nome não pode conter números";
    }
    return "";
  };

  const validateCpf = () => {
    if (!/^\d{3}[-\.\/]?\d{3}[-\.\/]?\d{3}[-\.\/]?\d{2}$/.test(formDataPaciente.cpf)) {
      return "O CPF deve conter apenas números, pontos e traços";
    }
    return "";
  };
  
  const validateRg = () => {
    if (!/^\d{1,3}[-\.\/]?\d{1,3}[-\.\/]?\d{1,3}[-\.\/]?\d{1,2}$/.test(formDataPaciente.rg)) {
      return "O RG deve conter apenas números, pontos e traços";
    }
    return "";
  };

  const validateTelefone = () => {
    if (!/^\d+$/.test(formDataPaciente.telefone)) {
      return "O Telefone só deve conter números";
    }
    return "";
  };

  const validateForm = () => {
    const errors = {
      nome: validateNome(),
      cpf: validateCpf(),
      rg: validateRg(),
      telefone: validateTelefone(),
    };

    setvalidationDataFormPaciente(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/v1/usuarios/update/users/${usuarioParaAtualizar.id}`,
          formDataPaciente
        );

        window.location.reload();
        console.log('Resposta da solicitação PUT:', response.data);
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    }
  };

  return (
    <form
      className="modal fade show"
      id="form-modal"
      style={{ display: "block" }}
      tabIndex="-1"
      role="dialog"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className="modalCloseFormeAddPaciente" onClick={handleClose}>
        <p className="closeFormX fw-bold">X</p>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            placeholder="Nome"
            value={formDataPaciente.nome}
            onChange={handleInputChange}
          />
          {validationDataFormPaciente.nome && (
            <div className="text-danger alert alert-danger">
              {validationDataFormPaciente.nome}
            </div>
          )}
        </div>

        <div className="col">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="password"
            placeholder="Password"
            value={formDataPaciente.password}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            value={formDataPaciente.email}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="cpf" className="form-label">
            CPF
          </label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            placeholder="Cpf"
            value={formatCPF(formDataPaciente.cpf)}
            onChange={handleInputChange}
            maxLength="14"
          />
          {validationDataFormPaciente.cpf && (
            <div className="text-danger">
              {validationDataFormPaciente.cpf}
            </div>
          )}
        </div>
        <div className="col">
          <label htmlFor="rg" className="form-label">
            RG
          </label>
          <input
            type="text"
            className="form-control"
            id="rg"
            placeholder="Rg"
            value={formatRG(formDataPaciente.rg)}
            onChange={handleInputChange}
            maxLength={12}
          />
          {validationDataFormPaciente.rg && (
            <div className="text-danger">
              {validationDataFormPaciente.rg}
            </div>
          )}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="telefone" className="form-label">
            Telefone
          </label>
          <input
            type="text"
            className="form-control"
            id="telefone"
            placeholder="Telefone"
            value={formDataPaciente.telefone}
            onChange={handleInputChange}
          />
          {validationDataFormPaciente.telefone && (
            <div className="text-danger">
              {validationDataFormPaciente.telefone}
            </div>
          )}
        </div>
        <div className="col">
          <label htmlFor="dataNascimento" className="form-label">
            Data de Nascimento
          </label>
          <input
            type="date"
            className="form-control"
            id="dataNascimento"
            value={formDataPaciente.dataNascimento}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="genero" className="form-label">
            Gênero
          </label>
          <select
            className="form-control"
            id="genero"
            name="genero"
            value={formDataPaciente.genero}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="planoPaciente" className="form-label">
            Plano
          </label>
          <select
            className="form-control"
            id="planoPaciente"
            value={formDataPaciente.planoPaciente}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="vip">Vip</option>
            <option value="gold">gGold</option>
            <option value="silver">Silver</option>
            <option value="bronze">Bronze</option>
            <option value="Nenhum">Nenhum</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        id="btn-modal-form"
      >
        Enviar
      </button>
    </form>
  );
}

export default FormularioDeAtualizarPaciente;
