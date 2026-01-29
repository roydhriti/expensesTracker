import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth, db } from "../firebase/firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { User } from "@/types";


export const registerUser = async (email: string, password: string, name?: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name: name || "Anonymous",
      role: "user",
    });
  } catch (error) {
    console.log("Firestore write error:", error);
    throw error;
  }

  return user;
};

export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};


export const getAllUsers = async (): Promise<User[]> => {
  const snapshot = await getDocs(collection(db, "users"));

  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...(doc.data() as Omit<User, "uid">)
  }));
};