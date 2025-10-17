// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFxxNP3wuXY0TY3NXr4C00HbFmYeZdx1w",
  authDomain: "booking-website-a16fb.firebaseapp.com",
  projectId: "booking-website-a16fb",
  storageBucket: "booking-website-a16fb.firebasestorage.app",
  messagingSenderId: "147436487035",
  appId: "1:147436487035:web:b51698986b6a4c56577dde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

export default app;

