
// firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAag_kZsCOeWuVYXRY4mHjISBaON_OFQVU",
  authDomain: "projetosistemainscricao.firebaseapp.com",
  projectId: "projetosistemainscricao",
  storageBucket: "projetosistemainscricao.firebasestorage.app",
  messagingSenderId: "510801581380",
  appId: "1:510801581380:web:68b9d27976018dea697311"
};

const app = initializeApp(firebaseConfig);

export default app;