// Pagamento.jsx
import React, { useState } from "react";

function Pagamento({ dados, onFinalizar }) {
  const [status, setStatus] = useState("aguardando"); // aguardando | processando | sucesso
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [mensagemCupom, setMensagemCupom] = useState("");

  const valorBase = 50.0;
  const valorFinal = valorBase - (valorBase * desconto);

  const cuponsValidos = {
    CUPOM10: 0.10,
    GRUPO20: 0.20,
    ISENTO100: 1.0,
  };

  const aplicarCupom = () => {
    const codigo = cupom.trim().toUpperCase();
    if (cuponsValidos[codigo]) {
      setDesconto(cuponsValidos[codigo]);
      setMensagemCupom(`Cupom aplicado: ${codigo} (${cuponsValidos[codigo] * 100}% de desconto)`);
    } else {
      setDesconto(0);
      setMensagemCupom("Cupom inválido.");
    }
  };

  const processarPagamento = () => {
    setStatus("processando");
    setTimeout(() => {
      setStatus("sucesso");
      onFinalizar(); // Chama setFase("confirmacao") no App.jsx
    }, 2000);
  };

  return (
    <div>
      <h2>Pagamento</h2>
      <p><strong>Nome:</strong> {dados.nome}</p>
      <p><strong>Valor original:</strong> R$ {valorBase.toFixed(2)}</p>

      {/* Campo para cupom */}
      <div style={{ marginBottom: "1em" }}>
        <label>Cupom de Desconto:</label><br />
        <input
          type="text"
          value={cupom}
          onChange={(e) => setCupom(e.target.value)}
        />
        <button type="button" onClick={aplicarCupom} style={{ marginLeft: "0.5em" }}>
          Aplicar
        </button>
        {mensagemCupom && <p>{mensagemCupom}</p>}
      </div>

      {desconto > 0 && (
        <p><strong>Valor com desconto:</strong> R$ {valorFinal.toFixed(2)}</p>
      )}

      {status === "aguardando" && (
        <button onClick={processarPagamento}>Pagar agora</button>
      )}

      {status === "processando" && <p>Processando pagamento...</p>}
      {status === "sucesso" && <p style={{ color: "green" }}>Pagamento realizado com sucesso!</p>}
    </div>
  );
}

export default Pagamento;