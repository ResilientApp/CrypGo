import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { useKey } from "./operations/keyContext";


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
  const { publicKey, privateKey } = useKey();

  const handleCreatePress = () => {
    console.log('Amount entered:', amount);
    // You would typically handle the transaction creation logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.titleText}>Create Transaction</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{amount}</Text>
      </View>
      <View style={styles.numpad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⌫'].map((digit) =>
          digit === 'C' ?
          <TouchableOpacity key={digit} style={styles.digitButton} onPress={handleClear}>
            <Text style={styles.digitText}>{digit}</Text>
          </TouchableOpacity> :
          digit === '⌫' ?
          <TouchableOpacity key={digit} style={styles.digitButton} onPress={handleBackspace}>
            <Text style={styles.digitText}>{digit}</Text>
          </TouchableOpacity> :
          renderDigitButton(digit)
        )}
      </View>
      <TouchableOpacity style={styles.createButton} onPress={handleCreatePress}>
        <Text style={styles.createButtonText}>Create Transaction</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  titleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputContainer: {
    backgroundColor: 'darkgrey',
    width: '80%',
    borderRadius: 5,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  inputText: {
    color: '#fff',
    fontSize: 20,
  },
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  digitButton: {
    width: '30%',
    aspectRatio: 1,
    margin: 5,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, // This will make the buttons rounded
  },
  digitText: {
    color: '#fff',
    fontSize: 24,
  },
  createButton: {
    backgroundColor: 'green',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CreateTransactionScreen;
