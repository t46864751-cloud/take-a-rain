// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4Wt9XR1B4ImdoMPEIfL_DZW3tTeVHiFk",
  authDomain: "prgkt-for-map.firebaseapp.com",
  projectId: "prgkt-for-map",
  databaseURL: "https://prgkt-for-map-default-rtdb.firebaseio.com",
  storageBucket: "prgkt-for-map.firebasestorage.app",
  messagingSenderId: "676887314928",
  appId: "1:676887314928:web:67a5eff336bb581cdb5d35",
  measurementId: "G-7X5MBSJTHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, analytics, database };
