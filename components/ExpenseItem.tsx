import { View, Text, StyleSheet } from "react-native";
import { Expense } from "@/types";

type Props = {
  expense: Expense;
};

export default function ExpenseItem({ expense }: Props) {
  const formattedDate = new Date(expense.date).toLocaleDateString("en-GB"); 
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{expense.title}</Text>
        <Text style={styles.category}>{expense.category}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>

      <Text style={styles.amount}>₹ {expense.amount.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  category: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },

  amount: {
    fontSize: 16,
    fontWeight: "700",
  },
});