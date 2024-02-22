// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import 'firebaseui/dist/firebaseui.css'; // Assurez-vous que vous utilisez FirebaseUI de manière appropriée

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfqphdWhMTPwCoygWxda8-hssk4CtsgWM",
    authDomain: "netflixv3-2772b.firebaseapp.com",
    projectId: "netflixv3-2772b",
    storageBucket: "netflixv3-2772b.appspot.com",
    messagingSenderId: "520787983566",
    appId: "1:520787983566:web:5fa150c43969cc73eb649f",
    measurementId: "G-15W3XF6Z02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
