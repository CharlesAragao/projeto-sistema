
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const handleLogin = async (evento) => {
        evento.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            onLogin(userCredential.user);
        }   catch (error) {
            setErro("Credenciais inválidas. Tente novamente.");
        }

}

return (
    <div className="container">
        <h2>Login do Administrador</h2>
        <form onSubmit={handleLogin}>
            <input 
            type="email" 
            value={email} 
            onChange={(evento) => setEmail(evento.target.value)} 
            placeholder="Email" 
            required
            />
            <input 
            type="password" 
            value={senha} 
            onChange={(evento) => setSenha(evento.target.value)} 
            placeholder="Senha" 
            required
            />
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            <button type="submit">Entrar</button>
        </form>
    </div>
    );

}



export default Login;