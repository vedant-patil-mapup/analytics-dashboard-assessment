

// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA6CAsK9sASQswfJOOZYyr8lIuWBOVvdMU",
    authDomain: "evdashboard-26ca6.firebaseapp.com",
    projectId: "evdashboard-26ca6",
    storageBucket: "evdashboard-26ca6.appspot.com",
    messagingSenderId: "972383556344",
    appId: "1:972383556344:web:e5313989f2d7d3dbb3a10d",
    measurementId: "G-H1BRV3345C"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };