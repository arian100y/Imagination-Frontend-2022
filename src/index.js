import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { getFirestore } from "firebase/firestore";
// / Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmsttvbGHp-3eRRzdERo-ylda1IJIY14M",
  authDomain: "imagination-tesis.firebaseapp.com",
  projectId: "imagination-tesis",
  storageBucket: "imagination-tesis.appspot.com",
  messagingSenderId: "529292999628",
  appId: "1:529292999628:web:dd86a17af2b4098ca1bb69",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
