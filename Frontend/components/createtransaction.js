import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { useKey } from "./operations/keyContext";


const CreateTransactionScreen = () => {
  const [amount, setAmount] = useState('');
  const { publicKey, privateKey } = useKey();

  const handleCreatePress = () => {
    // Handle the create button press
    console.log('Amount entered:', amount);
    console.log('Public Key', publicKey);

    // You can replace this with your GraphQL endpoint
    const apiUrl = 'https://cloud.resilientdb.com/graphql';

    const postData = {
      query: `mutation {
        postTransaction(data: {
          operation: "CREATE",
          amount: ${Number(amount)}, // Convert amount to number
          signerPublicKey: "${publicKey}",
          signerPrivateKey: "${privateKey}",
          recipientPublicKey: "ECJksQuF9UWi3DPCYvQqJPjF6BqSbXrnDiXUjdiVvkyH",
          asset: "{\"data\": {\"time\": 1690881023169 }}"
        }) {
          id
        }
      }`,
      variables: {}
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Transaction response:', data);
        // Handle the response data as needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors
      });
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
