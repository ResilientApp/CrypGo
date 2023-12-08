import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useKey } from "./operations/keyContext";

const getData = async (username, password) => {
  try {
    const jsonValue = await AsyncStorage.getItem(username + password);
    console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("couldn't get data");
  }
};

const Login = ({ navigation }) => {
  const { publicKey, privateKey } = useKey();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Check if the user exists in local storage
      const userData = await getData(username, password);

      if (userData) {
        // User exists, navigate to HomeScreen
        navigation.navigate("HomePage Temp");
      } else {
        // User does not exist, show an alert
        Alert.alert("Incorrect Username or Password", "Please try again");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  const handleForgotPassword = () => {
    // Here you would handle the forgot password logic or navigation
    navigation.navigate("Register");
    // TODO: Implement forgot password logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <Text style={styles.subtitle}>Enter Your Details</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Button title="Forgot Password?" onPress={handleForgotPassword} />
    </View>
  );
}

export default Login;
