import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity,  Image  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import InfoIcon from "../../assets/testHome/Info.svg";
import MoneyIcon from "../../assets/testHome/Money_Bag.svg";
import TimeIcon from "../../assets/testHome/ic_event.svg";
import * as Font from 'expo-font';

const fetchFonts = () => {
  return Font.loadAsync({
    'Actor_400Regular': require('../../assets/fonts/Actor-Regular.otf'),
    'PalanquinDark': require('../../assets/fonts/PalanquinDark-Regular.otf'),
    'DarkerGrotesque': require('../../assets/fonts/DarkerGrotesque-Regular.ttf'),
    'ClashDisplay': require('../../assets/fonts/ClashDisplay-Regular.otf'),
    'Mulish':require('../../assets/fonts/Mulish-Regular.ttf')
  });
};

const GetTransactionPage = ({ route }) => {
  const { transactionID } = route.params;
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const IconPlaceholder = ({ style }) => <View style={[styles.iconPlaceholder, style]} />;
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
      <Text style={styles.header}>View Transactions</Text>

      <View style={styles.transactionItem}>
          <View style={styles.transactionTextContainer}>
           <View style={styles.imageStyle}>
            <SvgXml xml={InfoIcon}/>
           </View>
           <Text style={styles.transactionText}>Transaction ID</Text>
           <Text style={styles.transactionDetailText}>{transactionData.id}</Text>
          </View>
      </View>

      <View style={styles.transactionItem}>
        <View style={styles.transactionTextContainer}>
           <View style={styles.imageStyle}>
            <SvgXml xml={MoneyIcon}/>
           </View>
        <Text style={styles.transactionText}>Amount</Text>
        <Text style={styles.transactionDetailText}>{transactionData.amount}</Text>
        </View>
      </View>

      <View style={styles.transactionItem}>
        <View style={styles.transactionTextContainer}>
           <View style={styles.imageStyle}>
            <SvgXml xml={TimeIcon}/>
           </View>
        <Text style={styles.transactionText}>Time Created</Text>
        <Text style={styles.transactionDetailText}>{transactionData.asset.time}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={goToUpdateTransactions} style={styles.button}>
        <Text style={styles.buttonText}>Update Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    letterSpacing: 1.5,
    color: '#fff',
    marginBottom: 30,
    fontWeight:'900',
    fontFamily: 'PalanquinDark'
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  transactionItem: {
    backgroundColor: '#333',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 9,
    marginBottom: 20,
    width: '99%',
    height: '20%'
  },
  transactionTextContainer: {
    
    flex: 1,
  },
  transactionText: {
    alignSelf:'stretch',
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  transactionDetailText: {
    paddingTop:25,
    fontSize: 14,
    color: '#fff',
    flexWrap:'wrap',
    color: '#adff2f'
  },
  imageStyle:{
    alignSelf:'flex-end',
    width: '15%',
    height: '15%'
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
