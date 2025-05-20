import React from "react";

function Confirmacao({ dados }) {
  return (
    <div>
      <h2 className="text-success">Inscrição enviada com sucesso!</h2>
      <p className="mt-3">Confira os dados enviados:</p>
      <ul className="list-group">
        {Object.entries(dados).map(([chave, valor]) => (
          <li className="list-group-item" key={chave}>
            <strong>{chave}:</strong> {valor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Confirmacao;