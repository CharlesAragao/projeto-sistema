import React from "react";

function Confirmacao({ dados }) {
  return (
    <div>
      <h2 className="text-success">Inscrição realizada com sucesso!</h2>
      <p className="mt-3">Número da inscrição: <strong>{dados.numero}</strong></p>
      <ul className="list-group">
        {Object.entries(dados).map(([chave, valor]) => (
          chave !== "numero" && (
          <li className="list-group-item" key={chave}>
            <strong>{chave}:</strong> {valor}
          </li>
          )
        ))}
      </ul>
    </div>
  );
}

export default Confirmacao;