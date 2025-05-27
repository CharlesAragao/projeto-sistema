import React, { useState } from "react";
import Formulario from "./Formulario";
import Revisao from "./Revisao";
import Confirmacao from "./Confirmacao";
import { salvarInscricao } from "./services"; // 👈 importa o serviço Firebase

function App() {
  const [dadosParciais, setDadosParciais] = useState(null);
  const [inscrito, setInscrito] = useState(null);
  const [fase, setFase] = useState("formulario");

  const handleSubmit = (dados) => {
    setDadosParciais(dados);
    setFase("revisao");
  }

  const confirmarInscricao = async () => {
    const id = await salvarInscricao(dadosParciais);        // 👈 salva no Firestore
    setInscrito({ ...dadosParciais, numero: id });          // 👈 passa o número da isncrição para confirmação
    setFase("confirmacao");
  };

  const handleEditar = () => {
    setFase("formulario");
  };

  return (
    <div className="container">
      <h1>Formulário de Inscrição</h1>

      {fase === "formulario" && (
        <Formulario 
        onSubmit={handleSubmit} 
        dadosIniciais={dadosParciais} 
        />
      )}

      {fase === "revisao" && dadosParciais && (
        <Revisao 
        dados={dadosParciais} 
        onConfirmar={confirmarInscricao} 
        onEditar={handleEditar} 
        />
      )}

      {fase === "confirmacao" && inscrito && (
        <Confirmacao 
        dados={inscrito} 
        />
      )}
    </div>
  );
}

export default App;