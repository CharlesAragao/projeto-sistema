import React, { useState } from "react";
import Formulario from "./Formulario";
import Revisao from "./Revisao";
import Confirmacao from "./Confirmacao";
import Login from "./Pages/Login";
import ListaInscricoes from "./Pages/ListaInscricoes";
import Pagamento from "./Pagamento";
import { salvarInscricao } from "./services";
import "./App.css"; // Importa estilos personalizados

function App() {
  const [dadosParciais, setDadosParciais] = useState(null);
  const [inscrito, setInscrito] = useState(null);
  const [fase, setFase] = useState("formulario");
  const [admin, setAdmin] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  const handleSubmit = (dados) => {
    setDadosParciais(dados);
    setFase("revisao");
  };

  const confirmarInscricao = async () => {
    const id = await salvarInscricao(dadosParciais);
    setInscrito({ ...dadosParciais, numero: id });
    setFase("pagamento");
  };

  const handleEditar = () => {
    setFase("formulario");
  };

  const handleLogin = (user) => {
    setAdmin(user);
    setMostrarLogin(false);
  };

  const handleLogout = () => {
    setAdmin(null);
  };

   return (
    <div className="container">
      <h1>Formulário de Inscrição</h1>

      {!admin ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <p>Administrador logado: {admin.email}</p>
          <button className="btn btn-danger mb-3" onClick={handleLogout}>Sair</button>
          <ListaInscricoes />
        </div>
      )}

      {!admin && fase === "formulario" && (
        <Formulario onSubmit={handleSubmit} dadosIniciais={dadosParciais} />
      )}

      {!admin && fase === "revisao" && dadosParciais && (
        <Revisao dados={dadosParciais} onConfirmar={confirmarInscricao} onEditar={handleEditar} />
      )}

      {!admin && fase === "pagamento" && inscrito && (
        <Pagamento dados={inscrito} onFinalizar={() => setFase("confirmacao")} />
      )}

      {!admin && fase === "confirmacao" && inscrito && (
        <Confirmacao dados={inscrito} />
      )}
    </div>
  );
}

export default App;