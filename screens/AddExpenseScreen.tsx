import { Category, Expense, } from "@/types";
import { Picker as RNPicker } from "@react-native-picker/picker";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { addExpense } from "../storage/storage";

const Picker: any = RNPicker;

export default function AddExpenseScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Other");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString();
  });

  const saveHandler = async () => {
    if (!title.trim()) {
      Alert.alert("Title required");
      return;
    }

    if (+amount <= 0) {
      Alert.alert("Amount must be > 0");
      return;
    }

    const expense: Expense = {
      id: Math.random().toString(),
      title: title.trim(),
      amount: Number(amount),
      category: category,
      date: date,

    };

    await addExpense(expense);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
        />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        />

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerWrapper}>
        <Picker
            style={styles.picker}
            selectedValue={category}
            onValueChange={(itemValue: Category) => setCategory(itemValue)}
            >
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Transport" value="Transport" />
            <Picker.Item label="Shopping" value="Shopping" />
            <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>


     <View style={styles.button} onStartShouldSetResponder={() => true} onResponderRelease={saveHandler}>
        <Text style={styles.buttonText} >
            Save Expense
        </Text>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    marginTop: 14,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },

    pickerWrapper: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        height: 45,
        justifyContent: "center",
    },

    picker: {
        height: 45,
        width: "100%",
        borderRadius: 8,
    },

  button: {
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
});