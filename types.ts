export type Category = "Food" | "Transport" | "Shopping" | "Other";


export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;
};


export type User = {
  uid: string;
  email: string;
  name: string;
  role: string;
};