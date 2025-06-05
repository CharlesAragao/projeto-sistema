// Pagamento.jsx
import React, { useState } from "react";

function Pagamento({ dados, onFinalizar }) {
  const [status, setStatus] = useState("aguardando"); // aguardando | processando | sucesso

  const processarPagamento = () => {
    setStatus("processando");

    // Simulação de pagamento (aguarda 2 segundos)
    setTimeout(() => {
      setStatus("sucesso");
      onFinalizar(); // volta para o App.jsx -> setFase("confirmacao")
    }, 2000);
  };

  return (
    <div>
      <h2>Pagamento</h2>
      <p><strong>Nome:</strong> {dados.nome}</p>
      <p><strong>Valor:</strong> R$ 50,00</p> {/* valor fixo só para testes */}

      {status === "aguardando" && (
        <button onClick={processarPagamento}>Pagar agora</button>
      )}

      {status === "processando" && <p>Processando pagamento...</p>}
      {status === "sucesso" && <p style={{ color: "green" }}>Pagamento realizado com sucesso!</p>}
    </div>
  );
}

export default Pagamento;