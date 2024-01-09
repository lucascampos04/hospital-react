import axios from 'axios';

export const authenticateUser = async (isEmail, isPassword, setUserRole,setUserNome,setUserCpf, setError) => {
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
            const { role, nome, cpf } = data || {};
            setUserRole(role)
            setUserCpf(cpf)
            setUserNome(nome)
            setError(null);
            console.log("User Role:", role);
            console.log("Nome : ", nome);
            console.log("CPF : ", cpf);
        } else {
            setError(data.message || "Erro desconhecido ao fazer login.");
            console.error("Erro ao fazer login:", data);
        }
    } catch (error) {
        setError("Erro ao fazer login | Erro: " + error)
    }
};
