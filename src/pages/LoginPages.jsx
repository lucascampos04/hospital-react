import React, { useEffect, useState } from "react";
import "../public/loginStyle.css";
import GoogleImg from "../public/img/pesquisa.png"
import axios from "axios";

function LoginPage() {
  const [isEmail, setEmail] = useState("");
  const [isPassword, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isUserRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/login/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: isEmail,
            password: isPassword,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const { role } = data;
          setUserRole(role);
          setError(null);
          console.log("User Role:", role);
        } else {
          setError(data.message || "Erro desconhecido ao fazer login.");
          console.error("Erro ao fazer login:", data);
        }
      } catch (error) {
        setError("Erro ao fazer login | Erro : " + error);
  
      }
    };

    fetchData();
  }, [isEmail, isPassword]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/login/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: isEmail,
          password: isPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { role } = data;
        setUserRole(role);
        setError(null);
        console.log("User Role:", role);

        if (role === "PACIENTE"){
          window.location.href = "/pacientes"
        }
      } else {
        setError(data.message || "Erro desconhecido ao fazer login.");
        console.error("Erro ao fazer login:", data);
      }
    } catch (error) {
      setError("Erro desconhecido ao fazer login.");
      console.error("Erro ao fazer login:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid">
      <div className="formularioLogin">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username" className="fw-bold text">Username:</label> <br />
            <input
              type="text"
              id="username"
              placeholder="Username"
              required
              value={isEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="fw-bold">Senha:</label> <br />
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Senha"
                required
                value={isPassword}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <i className="material-icons">visibility_off</i>
                ) : (
                  <i className="material-icons">visibility</i>
                )}
              </div>
              <div className="info-icon fw-bold">
                <i className="esqueceuSenha">Esquecer Senha</i>
              </div>
            </div>
          </div>
          <div className="group-btns">
            <button type="submit" className="btn btn-success mt-3">
              Login
            </button>
            <i className="fw-bold border create-account-btn">Criar Conta</i>
          </div>
        </form>
        <div className="container loginGoogle">
          <img src={GoogleImg}/>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default LoginPage;
