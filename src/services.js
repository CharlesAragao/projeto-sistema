// services.js
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);

export async function salvarInscricao(dados) {
  try {
    await addDoc(collection(db, "inscricoes"), dados);
    console.log("Inscrição salva com sucesso!");
  } catch (e) {
    console.error("Erro ao salvar inscrição: ", e);
  }
}