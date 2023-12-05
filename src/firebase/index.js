// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhSypubpEKrEKSVrqQ7ewBd8zd-78go_o",
  authDomain: "news-app-a5021.firebaseapp.com",
  projectId: "news-app-a5021",
  storageBucket: "news-app-a5021.appspot.com",
  messagingSenderId: "68302100393",
  appId: "1:68302100393:web:987038d42c92898bdcd6b8",
  measurementId: "G-G4VLGF4MLT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export { auth, db };
