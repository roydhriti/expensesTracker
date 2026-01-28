import { Expense } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "EXPENSES";

export const getExpenses = async (): Promise<Expense[]> => {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
};

export const saveExpenses = async (expenses: Expense[]) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(expenses));
};

export const addExpense = async (expense: Expense) => {
  const existing = await getExpenses();
  const updated = [expense, ...existing];
  await saveExpenses(updated);
};
