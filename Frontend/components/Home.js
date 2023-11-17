
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';

  // Function to navigate to the "Test" screen
  const goToLogin = () => {
    navigation.navigate("Login"); // "Test" is the name of the screen in your Stack Navigator
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

   const goToCreateTransaction = () => {
    navigation.navigate("Create Transaction");
  }
   
  const goToAllTransactions = () => {
    navigation.navigate("All Transactions");
  }
// Import your PNG logo (ensure the path is correct)
const logoPng = require('/Users/rohan/Documents/GitHub/crypgo_Frontend/CrypGo/Frontend/assets/logo.png');

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Login" onPress={goToLogin} />
      <Button title="Register" onPress= {goToRegister} />
      <Button title="See all Transactions" onPress= {goToAllTransactions} />
      <Button title="Create Transaction" onPress= {goToCreateTransaction} />
      <Text> Sign out Button Comes here too </Text>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        {/* Use the Image component to render your logo */}
        <Image source={logoPng} style={styles.logo} />
        <Text style={styles.headerText}>Accessibility on the Go</Text>
        <Text style={styles.descriptionText}>
          Join CrypGo to explore amazing features.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 350, // Set the width of your logo
    height: 350, // Set the height of your logo
    resizeMode: 'contain', // Add this to ensure the logo scales properly
  },
  container: {
    flex: 1,
    backgroundColor: '#000', // Assuming a black background
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    // Add more styling for the time text
  },
  batterySection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryText: {
    color: '#fff',
    // Add more styling for the battery text
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    color: '#fff',
    marginVertical: 10,
    // Add more styling for the header text
  },
  descriptionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    // Add more styling for the description text
  },
  button: {
    marginTop: 20,
    backgroundColor: 'green', // Use the correct shade of green
    paddingVertical: 10,
    width: 312, // Increase the width of the button
    alignSelf: 'center', // Center the button
    borderRadius: 25, // Increase as per the design for rounded corners
    justifyContent: 'center', // Center the text inside the button
  },
  buttonText: {
    textAlign: 'center', // Ensure text is centered within the button
    fontSize: 18,
    color: '#fff',
    // Add more styling for the button text
  },
});

export default App;
