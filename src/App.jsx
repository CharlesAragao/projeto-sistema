import React, { useState } from "react";
import Formulario from "./Formulario";
import Confirmacao from "./Confirmacao";
import { salvarInscricao } from "./services"; // 👈 importa o serviço Firebase

function App() {
  const [inscrito, setInscrito] = useState(null);

  const handleSubmit = async (dados) => {
    await salvarInscricao(dados);        // 👈 salva no Firestore
    setInscrito(dados);                  // 👈 exibe a confirmação
  };

  return (
    <div className="container">
      <h1>Formulário de Inscrição</h1>
      {!inscrito ? (
        <Formulario onSubmit={handleSubmit} />
      ) : (
        <Confirmacao dados={inscrito} />
      )}
    </div>
  );
}

export default App;