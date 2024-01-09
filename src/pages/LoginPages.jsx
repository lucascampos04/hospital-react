import React, { useState } from "react";
import { authenticateUser } from "../Services/Auth/authenticateUser";
import LoginForm from "../components/LoginForm/LoginForm";

function LoginPage() {
  const [isEmail, setEmail] = useState("");
  const [isPassword, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isUserRole, setUserRole] = useState(null);
  const [isUserCPF, setUserCPF] = useState(null);
  const [isUserNome, setUserNome] = useState(null);
  const [error, setError] = useState(null);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setButtonDisabled(true)
    try {
      await authenticateUser(isEmail, isPassword, setUserRole,setUserNome,setUserCPF, setError);

      setTimeout(() => {
        setButtonDisabled(false)
      }, 3000)
    } catch (error) {
      
    }
    
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginForm
      handleLogin={handleLogin}
      isEmail={isEmail}
      setEmail={setEmail}
      isPassword={isPassword}
      setPassword={setPassword}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      error={error}
      isButtonDisabled={isButtonDisabled}
    />
  );
}

export default LoginPage;
