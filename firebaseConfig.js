// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKpwAzVQP3Fj7zCzbYjDbLUwm2QD3CQZg",
  authDomain: "mental-health-cd418.firebaseapp.com",
  projectId: "mental-health-cd418",
  storageBucket: "mental-health-cd418.firebasestorage.app",
  messagingSenderId: "740551611354",
  appId: "1:740551611354:web:0435600f414aae1fb4e6e3",
  measurementId: "G-W0L3W388DE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);