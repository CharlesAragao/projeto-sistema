// services.js
import { collection, addDoc } from "firebase/firestore";
import  { db }  from "./firebaseConfig";


// Gerar número de inscrição baseado na data e hora atual
function gerarNumeroInscricao() {
  const agora = new Date();
  const formato = agora.toISOString().replace(/[-:.TZ]/g, "").slice(0,14);
  return `ID-${formato}`;
}

export async function salvarInscricao(dados) {
  try {
    const numero = gerarNumeroInscricao();
    await addDoc(collection(db, "inscricoes"), {
      ...dados,
      numero,
  });
    console.log("Inscrição salva com sucesso! ID:", numero);
    return numero;
  } catch (e) {
    console.error("Erro ao salvar inscrição: ", e);
    return null;
  }
}
