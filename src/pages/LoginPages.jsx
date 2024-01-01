import React, { useState } from "react";
import "../public/loginStyle.css";
import GoogleImg from "../public/img/pesquisa.png"

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                value={password}
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
