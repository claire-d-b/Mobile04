// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDId_DIGkZxSTzHl7ByD03Fllw6-lbvVbk",
  authDomain: "diaryapp-35e15.firebaseapp.com",
  projectId: "diaryapp-35e15",
  storageBucket: "diaryapp-35e15.firebasestorage.app",
  messagingSenderId: "469329963968",
  appId: "1:469329963968:web:ad0beaa76bb0fa1a107625",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ← manquant
export default auth;
