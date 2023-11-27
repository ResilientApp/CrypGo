import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';

const CreateTransactionScreen = () => {
  const [amount, setAmount] = useState('');

  const handleCreatePress = () => {
    // Handle the create button press
    console.log('Amount entered:', amount);
    // You would typically handle the transaction creation logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Transaction</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        placeholder="Enter Amount"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleCreatePress}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Assuming a black background
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    marginTop: 60, // Add proper margin for header
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    // Add more styling to match your screenshot
  },
  input: {
    backgroundColor: '#fff', // White background for the input
    borderRadius: 20, // Rounded corners for the input
    fontSize: 16,
    padding: 15,
    marginTop: 30, // Space from the header
    width: '80%', // Input width
    // Add more styling to match your screenshot
  },
  button: {
    marginTop: 30, // Space from the input
    backgroundColor: 'green', // Use the correct shade of green
    borderRadius: 20, // Rounded corners for the button
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: '80%', // Button width
    alignItems: 'center', // Center the text inside the button
    // Add more styling to match your screenshot
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    // Add more styling to match your screenshot
  },
});

export default CreateTransactionScreen;
