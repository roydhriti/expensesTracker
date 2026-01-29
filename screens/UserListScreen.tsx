import { getAllUsers } from "@/services/authService";
import { User } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function UserListScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const navigation: any = useNavigation();

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
  try {
    const data = await getAllUsers();
    setUsers(data);
  } catch (error) {
    console.log("Failed to load users", error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Users</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.row}>

            {/* LEFT SIDE */}
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>

            {/* RIGHT SIDE BUTTON */}
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Expenses", {
                  userId: item.uid,
                  userName: item.name,
                })
              }
            >
              <Text style={styles.buttonText}>View Expenses</Text>
            </TouchableOpacity>

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  email: {
    fontSize: 13,
    color: "#666",
  },

  button: {
    backgroundColor: "#1976d2",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
