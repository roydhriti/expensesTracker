import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3kIMQXZVL8epOfa9h8oRG-Zim9akJVas",
  authDomain: "expensestracker-4fc74.firebaseapp.com",
  projectId: "expensestracker-4fc74",
  storageBucket: "expensestracker-4fc74.firebasestorage.app",
  messagingSenderId: "616421610940",
  appId: "1:616421610940:web:ed141e6c2b1f01ea9707b9",
  measurementId: "G-Q2D6Y0RDQB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
