import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB39K2Qm1CxIEU6kkm_bDZP5-jZ_CyWzXk",
  authDomain: "miniblog-eb010.firebaseapp.com",
  projectId: "miniblog-eb010",
  storageBucket: "miniblog-eb010.firebasestorage.app",
  messagingSenderId: "835592524278",
  appId: "1:835592524278:web:d712d220411ba2fb0ab7d7",
  measurementId: "G-E2PE6TSFDX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };