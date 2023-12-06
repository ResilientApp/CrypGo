import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GetTransactionPage = ({ route }) => {
  const { transactionID } = route.params;
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const goToUpdateTransactions = () => {
    navigation.navigate("Update Transaction", { transactionID: transactionData.id });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = JSON.stringify({
          query: `
            query GetTransaction {
              getTransaction(id: "${transactionID}") {
                id
                version
                amount
                uri
                type
                publicKey
                operation
                metadata
                asset
              }
            }
          `,
        });

        const response = await fetch("https://cloud.resilientdb.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: postData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.data || !data.data.getTransaction) {
          // Handle the case where the expected data structure is not received
          console.error("Invalid GraphQL response:", data);
          return;
        }

        const receivedData = data.data.getTransaction;

        const assetData = JSON.parse(
          receivedData.asset.replace(/'/g, '"')
        ).data;

        const formattedTransaction = {
          id: receivedData.id,
          version: receivedData.version,
          amount: receivedData.amount,
          uri: receivedData.uri,
          type: receivedData.type,
          publicKey: receivedData.publicKey,
          operation: receivedData.operation,
          metadata: receivedData.metadata,
          asset: assetData,
        };
        // console.log(formattedTransaction);
        setTransactionData(formattedTransaction);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [transactionID]);

  if (loading) {
    // Display loading screen while data is being fetched
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction Details</Text>
      <View style={styles.textContainer}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{transactionData.id}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Version:</Text>
        <Text style={styles.value}>{transactionData.version}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>{transactionData.amount}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>URI:</Text>
        <Text style={styles.value}>{transactionData.uri}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{transactionData.type}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Public Key:</Text>
        <Text style={styles.value}>{transactionData.publicKey}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Operation:</Text>
        <Text style={styles.value}>{transactionData.operation}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Metadata:</Text>
        <Text style={styles.value}>{transactionData.metadata || "N/A"}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Asset Time:</Text>
        <Text style={styles.value}>{transactionData.asset.time}</Text>
      </View>
      <TouchableOpacity onPress={goToUpdateTransactions} style={styles.button}>
        <Text style={styles.buttonText}>Update Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ccontainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000000', // Set background color to black
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFFFFF', // Set header text color to white
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#FFFFFF', // Set label text color to white
  },
  value: {
    flex: 2,
    color: '#CCCCCC', // Set value text color to grey
  },
  loadingText: {
    color: "white", // Set text color for the loading indicator (if needed)
  },
  button: {
    marginTop: 16,
    backgroundColor: "#3498db", // Set button background color
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff", // Set button text color
    fontSize: 16,
  },
});

export default GetTransactionPage;
