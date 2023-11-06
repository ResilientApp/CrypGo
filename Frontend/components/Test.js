import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TestPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Test Page</Text>
      <View style={styles.inputContainer}>
        <View style={styles.input} />
        <View style={styles.input} />
        <View style={styles.input} />
        <View style={styles.input} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.buttonA]}>
          <Text>A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonB]}>
          <Text>B</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.input} />
      </View>
      <View style={styles.input} />
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
  inputContainer: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonA: {
    backgroundColor: 'darkgrey',
  },
  buttonB: {
    backgroundColor: 'grey',
  },
});

export default TestPage;
