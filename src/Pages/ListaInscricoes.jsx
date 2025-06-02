
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";


function ListaInscricoes() {
  const [inscricoes, setInscricoes] = useState([]);

  useEffect(() => {
    const buscarInscricoes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "inscricoes"));
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInscricoes(lista);
      } catch (erro) {
        console.error("Erro ao buscar inscrições:", erro);
      }
    };

    buscarInscricoes();
  }, []);

  return (
    <div>
      <h2>Lista de Inscrições</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Número</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            {/* Adicione mais colunas conforme necessário */}
          </tr>
        </thead>
        <tbody>
          {inscricoes.map((inscricao) => (
            <tr key={inscricao.id}>
              <td>{inscricao.id}</td>
              <td>{inscricao.nome}</td>
              <td>{inscricao.email}</td>
              <td>{inscricao.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaInscricoes;