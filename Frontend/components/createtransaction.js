import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, SafeAreaView, TextInput } from 'react-native';

const CreateTransactionScreen = () => {
  const [amount, setAmount] = useState('');

  const handlePressDigit = (digit) => {
    setAmount((prevAmount) => prevAmount + digit);
  };

  const handleBackspace = () => {
    setAmount((prevAmount) => prevAmount.slice(0, -1));
  };

  const handleClear = () => {
    setAmount('');
  };

  const handleCreatePress = () => {
    console.log('Amount entered:', amount);
    // Transaction creation logic goes here
  };

  // ... renderDigitButton function remains the same ...

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Transaction</Text>
      </View>
      <View style={styles.mainContent}>
        <TextInput 
          style={styles.inputBox} 
          value={amount} 
          editable={false} // Make it non-editable; the input comes from the numpad
          placeholderTextColor="#ddd" 
          placeholder="Enter amount"
        />
        {/* ... Numpad and Create Button goes here ... */}
      </View>
      <View style={styles.numpad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(renderDigitButton)}
        <TouchableOpacity style={styles.digitButton} onPress={handleClear}>
          <Text style={styles.functionText}>C</Text>
        </TouchableOpacity>
        {renderDigitButton('0')}
        <TouchableOpacity style={styles.digitButton} onPress={handleBackspace}>
          <Text style={styles.functionText}>⌫</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.createButton} onPress={handleCreatePress}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjust to space out the header, main content, and numpad
  },
  header: {
    marginTop: 20, // Add proper margin for header
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    // Add more styling to match your screenshot
  },
  inputBox: {
    backgroundColor: 'grey', // Dark grey background
    color: '#fff', // White text color
    fontSize: 20,
    width: '80%',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    marginBottom: 20, // Space above the numpad
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
