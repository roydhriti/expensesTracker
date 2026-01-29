import { useContext, useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, ToastAndroid, Platform } from "react-native";
import { loginUser } from "../services/authService";
import { AuthContext } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import Toast from "react-native-toast-message";


export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setRole } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
    const userCredential = await loginUser(email, password);
    const uid = userCredential.user.uid;

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User data not found",
      });
      return;
    }

    const data = docSnap.data();
    setRole(data.role);
  } catch (err: any) {
    console.log("Login error:", err);

    Toast.show({
      type: "error",
      text1: "Login Failed",
      text2: "Credentials are wrong",
    });
    }
    }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            {" "}Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6fb",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    elevation: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#1677ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },

  footerText: {
    fontSize: 13,
    color: "#444",
  },

  link: {
    fontSize: 13,
    color: "#1677ff",
    fontWeight: "600",
  },
});
