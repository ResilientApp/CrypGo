import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useKey } from "../operations/keyContext";


const UpdateTransactionScreen = () => {
  const [amount, setAmount] = useState("");
  const { publicKey, privateKey } = useKey();

  const handlePressDigit = (digit) => {
    setAmount((prevAmount) => prevAmount + digit);
  };

  const handleBackspace = () => {
    setAmount((prevAmount) => prevAmount.slice(0, -1));
  };

  const handleClear = () => {
    setAmount("");
  };

  const handleCreatePress = () => {
    console.log("Amount entered:", amount);
    // You can replace this with your GraphQL endpoint
    const apiUrl = "https://cloud.resilientdb.com/graphql";

    const postData = {
      query: ` mutation { postTransaction(data: {
                operation: "CREATE"
                amount: ${amount}
                signerPublicKey: "${publicKey}",
                signerPrivateKey: "${privateKey}",
                recipientPublicKey: "ECJksQuF9UWi3DPCYvQqJPjF6BqSbXrnDiXUjdiVvkyH"
                asset: """{
            "data": { "time": 1690881023169
              },
            }"""
            })      {
          id
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
      <StatusBar barStyle="light-content" />
      <Text style={styles.amountText}>{amount}</Text>
      <View style={styles.numpad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(renderDigitButton)}
        {/* Clear button */}
        <TouchableOpacity style={styles.digitButton} onPress={handleClear}>
          <Text style={styles.functionText}>C</Text>
        </TouchableOpacity>
        {/* Zero button */}
        {renderDigitButton("0")}
        {/* Backspace button */}
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
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  amountText: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 20,
  },
  numpad: {
    borderRadius: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
    maxWidth: 300, // Set the max width for the numpad
  },
  digitButton: {
    width: "33%", // Each button will take up one-third of the container width
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  digitText: {
    fontSize: 20,
    color: "#000",
    backgroundColor: "#fff",
    width: 60, // Set a fixed width for the circular shape
    height: 60, // Set a fixed height for the circular shape
    textAlign: "center",
    lineHeight: 60, // Center the text vertically
    borderRadius: 30, // Half of width and height to make it circular
    overflow: "hidden", // Ensure the background does not bleed outside the border radius
  },
  functionText: {
    fontSize: 23,
    color: "#000",
    backgroundColor: "#ddd", // A different background color for functional buttons
    width: 60, // Set a fixed width for the circular shape
    height: 60, // Set a fixed height for the circular shape
    textAlign: "center",
    lineHeight: 60, // Center the text vertically
    borderRadius: 30, // Half of width and height to make it circular
    overflow: "hidden", // Ensure the background does not bleed outside the border radius
  },
  createButton: {
    borderRadius: 100,
    backgroundColor: "green",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default UpdateTransactionScreen;
