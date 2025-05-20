import React, { useState } from "react";
import Formulario from "./Formulario";
import Confirmacao from "./Confirmacao";

function App() {
  const [inscrito, setInscrito] = useState(null);

  return (
    <div className="container">
        <h1>Formulário de Inscrição</h1>
        {!inscrito ? (
          <Formulario onSubmit={setInscrito} />
        ) : (
          <Confirmacao dados={inscrito} />
        )}
    </div>
  );
}

export default App;