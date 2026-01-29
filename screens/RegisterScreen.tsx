import { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { registerUser } from "../services/authService";
import Toast from "react-native-toast-message";

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");


  const handleRegister = async () => {

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
        Toast.show({
            type: "error",
            text1: "Invalid Password",
            text2: "Password must be at least 6 characters and contain both letters and numbers.",
            position: "top", 
            visibilityTime: 3000, 
        });
        return;
    }
    try {
      await registerUser(email, password, name);
      Alert.alert("Success", "User registered successfully!");
      navigation.navigate("Login");
    } catch (err: any) {
      Toast.show({
      type: "error",
      text1: "Register Failed",
      text2: err.message || "Something went wrong",
      position: "top",
      visibilityTime: 3000,
    });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        />

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

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            {" "}Sign In
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
