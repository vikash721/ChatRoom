// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

import { getFirestore } from "firebase/firestore";
//  Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDV06_4qpO2J0__JRT-qXG4I_pikuLhVKc",
  authDomain: "chatroom-80f1e.firebaseapp.com",
  projectId: "chatroom-80f1e",
  storageBucket: "chatroom-80f1e.appspot.com",
  messagingSenderId: "150034614362",
  appId: "1:150034614362:web:148cc130d02a2ac2f27063",
  measurementId: "G-G21H8EV59K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
