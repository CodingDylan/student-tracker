// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcabDCwRQ-iSqGs-aeDTeiDHZH1HkpOqk",
  authDomain: "student-tracker-e881c.firebaseapp.com",
  projectId: "student-tracker-e881c",
  storageBucket: "student-tracker-e881c.appspot.com",
  messagingSenderId: "996776576720",
  appId: "1:996776576720:web:95d1efca0ca73afbb440d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
