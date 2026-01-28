import { View, Text, StyleSheet } from "react-native";

type Props = {
  total: number;
};

export default function SummaryCard({ total }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Today's Total</Text>
      <Text style={styles.amount}>₹ {total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#e0e0e0",
    margin: 10,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
  },
  amount: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
