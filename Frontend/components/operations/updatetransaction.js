import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const UpdateTransactions = () => {
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [thirdInput, setThirdInput] = useState('');
  const [foruthInput, setFourthInput] = useState('');
  const [combinedInput, setCombinedInput] = useState('');

  const handlePressA = () => {
    // Combine the first two input values and set it to the last text input
    setCombinedInput(firstInput + ' ' + secondInput);
  };

  const handlePressB = async () => {
    try {
      const postData = JSON.stringify({
        query: `mutation GenerateKeys {
          generateKeys {
            publicKey
            privateKey
          }
        }`,
        variables: {}
      });

      const response = await fetch('https://cloud.resilientdb.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: postData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Assuming the response structure is like { data: { generateKeys: { publicKey, privateKey } } }
      const { publicKey, privateKey } = data.data.generateKeys;

      // Update state with the received data
      setCombinedInput(`Public Key: ${publicKey}, Private Key: ${privateKey}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Test Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        onChangeText={setFirstInput}
        value={firstInput}
      />
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        onChangeText={setSecondInput}
        value={secondInput}
      />
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        onChangeText={setThirdInput}
        value={thirdInput}
      />
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        onChangeText={setFourthInput}
        value={foruthInput}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.buttonA]} onPress={handlePressA}>
          <Text>A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonB]} onPress={handlePressB}>
        <Text>B</Text>
      </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Results show here..."
        value={combinedInput}
        editable={false} // Make this TextInput read-only
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    color: 'green',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonA: {
    backgroundColor: 'darkgrey',
  },
  buttonB: {
    backgroundColor: 'grey',
  },
});

export default UpdateTransactions;
