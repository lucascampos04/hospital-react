import React, {useState} from "react"
import GoogleImg from "../../public/img/pesquisa.png"
import HospitalImg from "../../public/img/HospitalImg.jfif"
import "../../public/loginStyle.css"

const LoginForm = ({ handleLogin, isEmail, setEmail, isPassword, setPassword, showPassword, togglePasswordVisibility, error, isButtonDisabled }) => {
    return (
      <div className="container-fluid">
        <div className="imgHospital">
            <img src={HospitalImg} alt="Google Logo" />
        </div>
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
              <div className="eye-createaccont">
              <div className="info-icon fw-bold">
                <i className="esqueceuSenha">Esquecer Senha</i>
              </div>
              <div className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <i className="material-icons">visibility_off</i>
                ) : (
                  <i className="material-icons">visibility</i>
                )}
              </div>
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
            <img src={GoogleImg} alt="Google Logo" />
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    );
  }
  
  export default LoginForm;