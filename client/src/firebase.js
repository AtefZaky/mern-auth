// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-d291b.firebaseapp.com",
  projectId: "mern-auth-d291b",
  storageBucket: "mern-auth-d291b.appspot.com",
  messagingSenderId: "459898352744",
  appId: "1:459898352744:web:2d96e4e39a0ca2b78df7dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app