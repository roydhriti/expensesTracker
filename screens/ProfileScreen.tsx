import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        setName(snap.data().name);
      }
    };

    loadProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      Alert.alert("Error", "Failed to logout");
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No user logged in.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>


        <TouchableOpacity
            style={styles.logout}
            onPress={handleLogout}
        >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Logout</Text>
        </TouchableOpacity>

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
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
    width: 80,
  },
  value: {
    fontWeight: "400",
  },
  logout:{
    backgroundColor: "#d32f2f", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12, 
    alignItems: "center", 
    marginTop: 20,
  }
});
