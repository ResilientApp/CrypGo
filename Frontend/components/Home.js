import React, { useState, useEffect }from "react";
import {
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const logoPng = require(
  "../assets/logo.png",
);
import * as LocalAuthentication from 'expo-local-authentication';

const Home = () => {
    // useEffect hook to call authenticate when the component mounts
    useEffect(() => {
      authenticate();
    }, []); // The empty dependency array ensures this runs only once when the component mounts
  // Function to navigate to the "Test" screen

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      alert("Your device doesn't support biometric authentication.");
      return;
    }

    const supportedMethods = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return alert('No biometric data found. Please enroll your biometrics.');
    }

    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      setIsAuthenticated(true);
    } else {
      alert('Authentication failed. Please try again.');
    }
  };




  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate("Login"); // "Test" is the name of the screen in your Stack Navigator
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  const goToCreateTransaction = () => {
    navigation.navigate("Create Transaction");
  };

  const goToAllTransactions = () => {
    navigation.navigate("All Transactions");
  };

  const goToHomePageTemp = () => {
    navigation.navigate("HomePage Temp");
  }
  // Import your PNG logo (ensure the path is correct)
  return (
    <View style={styles.container}>
      <Text>Sign out Button Comes here too</Text>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        {/* Use the Image component to render your logo */}
        <Image source={logoPng} style={styles.logo} />
        <Text style={styles.headerText}>Accessibility on the Go</Text>
        <Text style={styles.descriptionText}>
          Join CrypGo to explore amazing features.
        </Text>
        <Button title="Login" onPress={goToLogin} />
        <Button title="Register" onPress={goToRegister} />
        <Button title="See all Transactions" onPress={goToAllTransactions} />
        <Button title="Create Transaction" onPress={goToCreateTransaction} />
        <Button title= "HomePage Temp" onPress={goToHomePageTemp} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 350, // Set the width of your logo
    height: 350, // Set the height of your logo
    resizeMode: "contain", // Add this to ensure the logo scales properly
  },
  container: {
    flex: 1,
    backgroundColor: "#000", // Assuming a black background
    alignItems: "center",
    justifyContent: "center",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeText: {
    color: "#fff",
    // Add more styling for the time text
  },
  batterySection: {
    flexDirection: "row",
    alignItems: "center",
  },
  batteryText: {
    color: "#fff",
    // Add more styling for the battery text
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    color: "#fff",
    marginVertical: 10,
    // Add more styling for the header text
  },
  descriptionText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    // Add more styling for the description text
  },
  button: {
    marginTop: 20,
    backgroundColor: "green", // Use the correct shade of green
    paddingVertical: 10,
    width: 312, // Increase the width of the button
    alignSelf: "center", // Center the button
    borderRadius: 25, // Increase as per the design for rounded corners
    justifyContent: "center", // Center the text inside the button
  },
  buttonText: {
    textAlign: "center", // Ensure text is centered within the button
    fontSize: 18,
    color: "#fff",
    // Add more styling for the button text
  },
});

export default Home;
