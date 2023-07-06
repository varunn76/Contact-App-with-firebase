// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSg5vxTy2jyVgWEaZlFV8hVUbOY2qHP30",
  authDomain: "vite-contact-54473.firebaseapp.com",
  projectId: "vite-contact-54473",
  storageBucket: "vite-contact-54473.appspot.com",
  messagingSenderId: "442780306024",
  appId: "1:442780306024:web:df385f3510ae0545a609dd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);