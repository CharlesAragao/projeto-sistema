import React, { useState } from "react";
import Formulario from "./Formulario";
import Revisao from "./Revisao";
import Confirmacao from "./Confirmacao";
import Login from "./Pages/Login";
import ListaInscricoes from "./Pages/ListaInscricoes";
import { salvarInscricao } from "./services";

function App() {
  const [dadosParciais, setDadosParciais] = useState(null);
  const [inscrito, setInscrito] = useState(null);
  const [fase, setFase] = useState("formulario"); // fases: formulario, revisao, confirmacao
  const [admin, setAdmin] = useState(null); // se um admin está logado
  const [mostrarLogin, setMostrarLogin] = useState(false); // Controla exibição do formulário de login


  const handleSubmit = (dados) => {
    setDadosParciais(dados);
    setFase("revisao");
  };

  const confirmarInscricao = async () => {
    const id = await salvarInscricao(dadosParciais);
    setInscrito({ ...dadosParciais, numero: id });
    setFase("confirmacao");
  };

  const handleEditar = () => {
    setFase("formulario");
  };

  const handleLogin = (user) => {
    setAdmin(user); // usuário logado como admin
    setMostrarLogin(false); // Esconde o formulário após login
  };

  const handleLogout = () => {
    setAdmin(null); // desloga o admin
  };

  return (
    <div className="container">
      <h1>Formulário de Inscrição</h1>

      {/* Área de login/admin */}
      {!admin ? (
        <>
          {!mostrarLogin ? (
            <button className="btn btn-primary mb-3" id="login" onClick={() => setMostrarLogin(true)}>
              Login do Administrador
            </button>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </>
      ) : (
        <div>
          <p>Administrador logado: {admin.email}</p>
          <button className="btn btn-danger mb-3" onClick={handleLogout}>Sair</button>
          <ListaInscricoes />
        </div>
      )}

      {/* Fluxo normal do usuário */}
      {!admin && fase === "formulario" && (
        <Formulario onSubmit={handleSubmit} dadosIniciais={dadosParciais} />
      )}

      {!admin && fase === "revisao" && dadosParciais && (
        <Revisao dados={dadosParciais} onConfirmar={confirmarInscricao} onEditar={handleEditar} />
      )}

      {!admin && fase === "confirmacao" && inscrito && (
        <Confirmacao dados={inscrito} />
      )}
    </div>
  );
}

export default App;