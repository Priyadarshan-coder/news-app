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
  apiKey: "AIzaSyAnR1MNLymefXlXAWM2v23sDh00WFPQun0",
  authDomain: "news-app-6a8ba.firebaseapp.com",
  projectId: "news-app-6a8ba",
  storageBucket: "news-app-6a8ba.appspot.com",
  messagingSenderId: "539237801273",
  appId: "1:539237801273:web:817e6db080b66ea787dce8",
  measurementId: "G-070YP6W0VZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export { auth, db };
