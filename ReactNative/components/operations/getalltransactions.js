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
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/money2.png";
import { useKey } from "./keyContext";

function Operations() {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]); // Add this line to create a state variable
  const { publicKey, privateKey } = useKey();

  const goToUpdateTransactions = () => {
    navigation.navigate("Update Transaction", {
      transactionID: transaction.transactionID,
    });
  };

  const goToGetTransaction = () => {
    navigation.navigate("Get Transaction");
  };

  const handleTransactionPress = (transaction) => {
    // Redirect to the "Get Transaction" page with the transactionID
    navigation.navigate("Get Transaction", {
      transactionID: transaction.transactionID,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
  style={styles.transactionItem}
  onPress={() => handleTransactionPress(item)}
>
  <Image source={logo} style={styles.transactionImage} />
  <View style={styles.transactionDetails}>
    <Text style={styles.transactionType}>{item.type}</Text>
    <View style={styles.rightDetails}>
      <Text style={styles.transactionAmount}>{`$${item.amount}`}</Text>
      <Text style={styles.transactionDate}>{item.date}</Text>
    </View>
  </View>
</TouchableOpacity>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = JSON.stringify({
          query: `
              query { getFilteredTransactions(filter: {
                ownerPublicKey: "${publicKey}"
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
        }
        );

        //console.log(transactions);
        // Set the transactions state with the new data
        console.log("Public Key: ", publicKey);
        console.log("Transactions: ", transactions);
        if (transactions.length === 0) {
          Alert.alert(
            "Go Make Some Transactions",
            "You haven't made any transactions yet.",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("HomePage Temp"),
              },
            ],
            { cancelable: false }
          );
        }
        setTransactions(transactions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts
  return (
    <>
      {/* <View style={styles2.container}>
        <Text>Operations Page Work in Progress Do not Touch</Text>
        <Button title="Update Transactions" onPress={goToUpdateTransactions} />
        <Button title="Get Transaction" onPress={goToGetTransaction} />
      </View> */}
      {/* Rest of your components */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
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
    backgroundColor: "#4c56514c",
    borderRadius: 16,
    height: 62,
    width: 355,
    marginVertical: "2%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  transactionImage: {
    width: 48,
    height: 45,
    borderRadius: 6,
    backgroundColor: '#ffffff1a',
  },
  transactionDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightDetails: {
    alignItems: "flex-end",
  },
  transactionType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: "2%",
  },
  transactionAmount: {
    fontSize: 18,
    color: (amount) => (amount >= 0 ? "green" : "red"),
    color: "white",
  },
  transactionDate: {
    color: "grey",
    alignSelf: "flex-end",
  },
});

export default Operations;
