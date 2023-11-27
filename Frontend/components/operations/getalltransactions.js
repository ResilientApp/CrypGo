import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/logo.png";

function Operations() {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]); // Add this line to create a state variable
  const goToUpdateTransactions = () => {
    navigation.navigate("Update Transaction");
  };

  const goToGetTransaction = () => {
    navigation.navigate("Get Transaction");
  };

  const handleTransactionPress = (transaction) => {
    // Handle the press event for a transaction (e.g., navigate to a details screen)
    console.log("Transaction pressed:", transaction);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.transactionItem}
      onPress={() => handleTransactionPress(item)}
    >
      <Image source={logo} style={styles.transactionImage} />
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text style={styles.transactionAmount}>{`$${item.amount}`}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = JSON.stringify({
          query: `
              query { getFilteredTransactions(filter: {
                ownerPublicKey: ""
                recipientPublicKey: ""
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
        const receivedData = data.data.getFilteredTransactions;
        const transactions = receivedData.map((transaction, index) => {
          // Extracting relevant information from the received data
          const { id, operation, amount, asset, publicKey } = transaction;

          // Parsing the asset field
          const assetData = JSON.parse(asset.replace(/'/g, '"')).data;

          // Creating the desired format
          return {
            id: index + 1,
            type: operation,
            date: assetData.time
              ? new Date(assetData.time).toISOString().slice(0, 10)
              : "",
            amount: amount,
            transactionID: id,
          };
        });

        //console.log(transactions);
        // Set the transactions state with the new data
        setTransactions(transactions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts
  return (
    <>
      {
        /* <View style={styles2.container}>
        <Text>Operations Page Work in Progress Do not Touch</Text>
        <Button title="Update Transactions" onPress={goToUpdateTransactions} />
        <Button title="Get Transaction" onPress={goToGetTransaction} />
      </View> */
      }
      <ScrollView>
        {/* Rest of your components */}
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </ScrollView>
    </>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "black",
  },
  transactionImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  transactionDate: {
    color: "#777",
    color: "grey",
    alignSelf: "flex-end",
  },
  transactionDate: {
    color: "#777",
    color: "grey",
    alignSelf: "flex-end",
  },
  transactionAmount: {
    fontSize: 18,
    color: (amount) => (amount >= 0 ? "green" : "red"),
    color: "white",
    alignSelf: "flex-end",
  },
});

export default Operations;
