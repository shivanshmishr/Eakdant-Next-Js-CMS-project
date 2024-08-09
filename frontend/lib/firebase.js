import { initializeApp } from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDk1z-cPDkp9gQkq-QF8-YYM6zA2MjIU9U",
  authDomain: "ekdantamurti.firebaseapp.com",
  projectId: "ekdantamurti",
  storageBucket: "ekdantamurti.appspot.com",
  messagingSenderId: "1031004121322",
  appId: "1:1031004121322:web:1f03a51f0ee59195cd0f93",
  measurementId: "G-S0RJ2M3964"
};

const firebaseapp = initializeApp(firebaseConfig);
export default firebaseapp;
