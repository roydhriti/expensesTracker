import { View, FlatList, Button, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { getExpenses } from "../storage/storage";
import { isSameDay } from "../lib/dates";
import { Expense } from "@/types";
import ExpenseItem from "@/components/ExpenseItem";
import SummaryCard from "@/components/SummaryCard";


export default function ExpensesScreen({ navigation }: any) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getExpenses();
      setExpenses(data);
    };

    const unsubscribe = navigation.addListener("focus", load);
    return unsubscribe;
  }, []);

  const todayTotal = expenses
    .filter(e => isSameDay(e.date, new Date().toISOString()))
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <View style={{ flex: 1 }}>
      <SummaryCard total={todayTotal} />

       <View style={styles.buttonContainer} onStartShouldSetResponder={() => true} onResponderRelease={() => navigation.navigate("AddExpense")}>
        <Text style={styles.buttonText}>Add Expense</Text>
    </View> 

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        contentContainerStyle={{ paddingBottom: 40 , paddingTop: 20}}
      />


    </View>
  );
}


const styles = StyleSheet.create({

buttonContainer: {
    backgroundColor: "#1976d2",
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
},

})