
import { Expense } from "@/types";
import { db, auth } from "../firebase/firebaseConfig";

import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";


// ----------------------
// ADD EXPENSE
// ----------------------
export const addExpense = async (expense: Expense) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const id = uuidv4();

  await setDoc(
    doc(db, "users", user.uid, "expenses", id),
    {
      ...expense,
      id,
    }
  );
};

// ----------------------
// GET EXPENSES
// ----------------------
export const getExpenses = async (userId?: string): Promise<Expense[]> => {
  const uid = userId || auth.currentUser?.uid;
  if (!uid) return [];

  const snapshot = await getDocs(
    collection(db, "users", uid, "expenses")
  );

  return snapshot.docs.map((doc) => doc.data() as Expense);
};

// ----------------------
// DELETE EXPENSE (optional)
// ----------------------
export const deleteExpense = async (id: string) => {
  const user = auth.currentUser;
  if (!user) return;

  await deleteDoc(
    doc(db, "users", user.uid, "expenses", id)
  );
};

