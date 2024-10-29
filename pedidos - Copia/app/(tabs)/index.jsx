import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import { useRouter, useFocusEffect } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [foundUser, setFoundUser] = useState(false);
  const [foundUserMessage, setFoundUserMessage] = useState("");
  const navigation = useNavigation();
  const router = useRouter();

  const handleLogin = async () => {
    setFoundUser(false);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/login?email=${email}&password=${password}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Success", `Welcome, ${data.email}!`);
        console.log("sucesso");

        // Navigate to Home screen, replacing the current stack entry
        // navigation.dispatch(StackActions.replace('home'));
        router.replace("/home");
      } else {
        setFoundUser(true);
        setFoundUserMessage("Usuário ou senha incorreto");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to connect to the server");
      console.error(error);
    }
  };

  return (
      <View style={styles.container}>
        <Image
          source={{ uri: "https://example.com/logo.png" }}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back!</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        {foundUser && (
          <Text style={styles.title_error}>{foundUserMessage}</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderColor: "#555",
    borderWidth: 1,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#1e90ff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  title_error: {
    fontSize: 24,
    color: "red",
    fontWeight: "600",
    marginBottom: 30,
  },
});