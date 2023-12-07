import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useKey } from './operations/keyContext';


const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { generateKeys } = useKey();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
      generateKeys();
      navigation.navigate('HomePage Temp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>
      <Text style={styles.subtitle}>Enter Your Details</Text>

      {/* Username input with label */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={[styles.input, styles.transparentInput]}
          onChangeText={setUsername}
          value={username}
          placeholder="Enter your username"
          autoCapitalize="none"
        />
      </View>

      {/* Password input with label */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, styles.transparentInput]}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password"
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      {/* Confirm Password input with label */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={[styles.input, styles.transparentInput]}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      {/* Transparent Button */}
      <TouchableOpacity style={[styles.transparentButton, styles.button]} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
    width: '80%', // Set the width of the input container
  },
  label: {
    color: '#fff',
    marginBottom: 8,
  },
  
  // Updated styles for the input
  input: {
    width: '100%', // Set the width of the input to 100%
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    color: '#fff',
    borderWidth: 2, // Add this line to set the border width
    borderColor: '#fff', // Add this line to set the border color
  },
  button: {
    backgroundColor: '#64F441',
  },
  transparentButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    width: '80%',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Register;