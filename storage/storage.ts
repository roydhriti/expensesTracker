import { Expense } from "@/types";

const KEY = "EXPENSES";


export const getExpenses = async (): Promise<Expense[]> => {
  if (typeof window !== "undefined" && window.localStorage) {
    const json = localStorage.getItem(KEY);  // works in browser
    return json ? JSON.parse(json) : [];
  }
  // fallback for mobile
  const AsyncStorage = (await import("@react-native-async-storage/async-storage")).default;
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
};

export const saveExpenses = async (expenses: Expense[]) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem(KEY, JSON.stringify(expenses));
    return;
  }
  const AsyncStorage = (await import("@react-native-async-storage/async-storage")).default;
  await AsyncStorage.setItem(KEY, JSON.stringify(expenses));
};



// export const getExpenses = async (): Promise<Expense[]> => {
//   const json = await AsyncStorage.getItem(KEY); //works only on mobile
//   return json ? JSON.parse(json) : [];
// };

// export const saveExpenses = async (expenses: Expense[]) => {
//   await AsyncStorage.setItem(KEY, JSON.stringify(expenses));
// };

export const addExpense = async (expense: Expense) => {
  const existing = await getExpenses();
  const updated = [expense, ...existing];
  await saveExpenses(updated);
};


