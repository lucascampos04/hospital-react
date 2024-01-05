import React, { useState } from "react";
import "../public/loginStyle.css";
import GoogleImg from "../public/img/pesquisa.png"
import axios from "axios";

function LoginPage() {
  const [isEmail, setEmail] = useState("");
  const [isPassword, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/api/v1/login/auth', {
          email : isEmail,
          password : isPassword,
      })

      console.log("Login sucess " + response.data)
    } catch (error) {
      if (error.response){
        console.log("Failed login ")
      } else if(error.response){
        console.log("No response received")
      } else {
        console.error("Erro ao conectar com a rota ", error);
      }
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
      </div>
    </div>
  );
}

export default LoginPage;
