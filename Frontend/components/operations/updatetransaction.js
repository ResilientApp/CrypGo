import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

const fetchFonts = () => {
  return Font.loadAsync({
    'Actor_400Regular': require('../../assets/fonts/Actor-Regular.otf'),
    'PalanquinDark': require('../../assets/fonts/PalanquinDark-Regular.otf'),
    'DarkerGrotesque': require('../../assets/fonts/DarkerGrotesque-Regular.ttf'),
    'ClashDisplay': require('../../assets/fonts/ClashDisplay-Regular.otf')
  });
};
import { useKey } from "./keyContext";

const UpdateTransactionScreen = ({ route }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { transactionID } = route.params;
  const [amount, setAmount] = useState("");
  const { publicKey, privateKey } = useKey();

  // Handle number press
  const handleNumberPress = (number) => {
    setInputValue((prevInputValue) => `${prevInputValue}${number}`);
  };

  // Handle delete press
  const handleDeletePress = () => {
    setInputValue((prevInputValue) => prevInputValue.slice(0, -1));
  };

  // Handle clear press
  const handleClearPress = () => {
    setInputValue('');
  };

  // Create transaction press
  const handleCreatePress = () => {
    console.log("Amount entered:", inputValue);
    // You can replace this with your GraphQL endpoint
    const apiUrl = "https://cloud.resilientdb.com/graphql";

    const postData = {
      query: ` mutation { updateTransaction(data:{
        id: "${transactionID}"
        operation: ""
        amount: ${inputValue}
        signerPublicKey: "${publicKey}"
        signerPrivateKey: "${privateKey}"
        recipientPublicKey: "ECJksQuF9UWi3DPCYvQqJPjF6BqSbXrnDiXUjdiVvkyH"
        asset: ""
        }) {
          id
          version
          amount
          metadata
          operation
          asset
          publicKey
          uri
          type
        }
        }`,
      variables: {},
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Transaction response:", data);
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });

    // Transaction creation logic goes here
  };

  // Render a single digit button for the numpad
  const renderDigitButton = (digit) => {
    return (
      <TouchableOpacity
        key={digit}
        style={styles.digitButton}
        onPress={() => handlePressDigit(digit.toString())}
      >
        <Text style={styles.digitText}>{digit}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Update Transaction</Text>
      <TextInput 
        style={styles.input} 
        onChangeText={setInputValue} 
        value={inputValue} 
        placeholder="Enter Amount"
        keyboardType="numeric"
        placeholderTextColor="#CBCBCB"
      />
      <View style={styles.keypad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'AC', 0, '⌫'].map((key) => (
          <TouchableOpacity
            key={key.toString()}
            style={styles.keypadButton}
            onPress={() => {
              if (key === 'AC') handleClearPress();
              else if (key === '⌫') handleDeletePress();
              else handleNumberPress(key.toString());
            }}
          >
            <Text style={styles.keypadButtonText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <LinearGradient
      colors={['#32cd32','#228b22']}
      style={{width: '80%',justifyContent: 'center',alignItems: 'center',paddingVertical: 10,borderRadius: 20,marginBottom: 20,}}
      >
        
        <TouchableOpacity onPress={handleCreatePress}>
        <Text style={styles.createButtonText}>Update Transaction</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    fontFamily: 'PalanquinDark'
  },
  input: {
    color: 'white',
    backgroundColor: 'black',
    width: '100%',
    borderRadius: 3,
    fontSize: 25,
    padding: 10,
    marginLeft: 15,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'DarkerGrotesque'
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  keypadButton: {
    width: '30%',
    margin: 5,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 40,
  },
  keypadButtonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'ClashDisplay'
  },
  createButton: {
    // backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "Actor_400Regular"
  },
});

export default UpdateTransactionScreen;