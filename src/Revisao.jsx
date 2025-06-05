
import React from "react";
import Pagamento from "./pagamento";

function Revisao({ dados, onEditar, onConfirmar }) {
    return (
        <div className="container">
            <h2>Revise seus dados</h2>
            <ul className="list-group-mb-3">
                {Object.entries(dados).map(([chave, valor]) =>  (
                    <li className="list-group-item" key={chave}>
                        <strong>{chave}:</strong> {valor}
                    </li>
                ))}
            </ul>
            <button onClick={onEditar} className="btn btn-secondary me-2">Editar</button>
            <button onClick={onConfirmar} className="btn btn-primary">Confirmar</button>
        </div>
    );
}

export default Revisao;