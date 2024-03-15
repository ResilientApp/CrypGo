import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useKey } from "./operations/keyContext";
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
// const fetchFonts = () => {
//   return Font.loadAsync({
//     'Actor_400Regular': require('../assets/fonts/Actor-Regular.otf'),
//     'PalanquinDark': require('../assets/fonts/PalanquinDark-Regular.otf'),
//     'DarkerGrotesque': require('../assets/fonts/DarkerGrotesque-Regular.ttf'),
//     'ClashDisplay': require('../assets/fonts/ClashDisplay-Regular.otf'),
//     'Mulish':require('../assets/fonts/Mulish-Regular.ttf')
//   });
// }
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
      navigation.navigate("HomePage Temp");
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
        placeholderTextColor="#aaaaaa"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        autoCapitalize="none"
      />
      <LinearGradient
      colors={['#32cd32','#228b22']}
      style={{width: '80%',justifyContent: 'center',alignItems: 'center',paddingVertical: 10,borderRadius: 20,marginBottom: 20, marginTop: 30}}
      >
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      </LinearGradient>
      <Button title="Forgot Password?" onPress={handleForgotPassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 24,
    fontFamily: 'PalanquinDark'
  },
  subtitle: {
    fontSize: 25,
    color: '#fff',
    marginBottom: 48,
    fontFamily: 'DarkerGrotesque'
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#fffaf0',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#fff',
    marginBottom: 24,
  },
  // button: {
  //   width: '80%',
  //   backgroundColor: 'green',
  //   padding: 16,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 4,
  //   marginBottom: 16,
  // },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Login;
