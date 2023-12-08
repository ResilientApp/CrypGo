import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { useKey } from "../operations/keyContext";
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();


const fetchFonts = () => {
  return Font.loadAsync({
    'Actor_400Regular': require('../../assets/fonts/Actor-Regular.otf'),
    'PalanquinDark': require('../../assets/fonts/PalanquinDark-Regular.otf'),
    'DarkerGrotesque': require('../../assets/fonts/DarkerGrotesque-Regular.ttf'),
    'ClashDisplay': require('../../assets/fonts/ClashDisplay-Regular.otf')
  });
};


const CreateTransaction = () => {
  const navigation = useNavigation();
  const [appIsReady, setAppIsReady] = useState(false);
  const [amount, setAmount] = useState("");
  const { publicKey, privateKey } = useKey();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleNumberPress = (digit) => {
    setInputValue((prevAmount) => prevAmount + digit);
  };

  // Handle delete press
  const handleDeletePress = () => {
    setInputValue((prevInputValue) => prevInputValue.slice(0, -1));
  };

  // Handle clear press
  const handleClearPress = () => {
    setInputValue('');
  }
  // Create transaction press
  const handleCreatePress = () => {
    console.log("Amount entered:", inputValue);
    // You can replace this with your GraphQL endpoint
    const apiUrl = "https://cloud.resilientdb.com/graphql";

    const postData = {
      query: ` mutation { postTransaction(data: {
                operation: "CREATE"
                amount: ${inputValue}
                signerPublicKey: "${publicKey}"
                signerPrivateKey: "${privateKey}"
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
        // Check if the transaction was successful
      if (data.errors) {
        // If there are errors, show an error alert
        Alert.alert("Error", "Failed to create transaction. Please try again.");
      } else {
        // If there are no errors, show a success alert
        Alert.alert("Success", "Transaction created successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("HomePage Temp"),
          },
        ],
        { cancelable: false });
      }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });

    // Transaction creation logic goes here
  };
  // if (!fontsLoaded && !fontError){
  //   return null;
  // }
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Transaction</Text>
      <TextInput 
        style={styles.input} 
        onChangeText={setInputValue} 
        value={inputValue} 
        placeholder="Enter Amount"
        keyboardType="numeric"
        placeholderTextColor="#CBCBCB"
      />
      <View style={styles.keypad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'AC', 0, '⌫'].map((key) => (
          <TouchableOpacity
            key={key.toString()}
            style={styles.keypadButton}
            onPress={() => {
              if (key === 'AC') handleClearPress();
              else if (key === '⌫') handleDeletePress();
              else handleNumberPress(key.toString());
            }}
          >
            <Text style={styles.keypadButtonText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <LinearGradient
      colors={['#32cd32','#228b22']}
      style={{width: '80%',justifyContent: 'center',alignItems: 'center',paddingVertical: 10,borderRadius: 20,marginBottom: 20,}}
      >
        
        <TouchableOpacity onPress={handleCreatePress}>
        <Text style={styles.createButtonText}>Create Transaction</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    fontFamily: 'PalanquinDark'
  },
  input: {
    color: 'white',
    backgroundColor: 'black',
    width: '100%',
    borderRadius: 3,
    fontSize: 25,
    padding: 10,
    marginLeft: 15,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'DarkerGrotesque'
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  keypadButton: {
    width: '30%',
    margin: 5,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 40,
  },
  keypadButtonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'ClashDisplay'
  },
  createButton: {
    // backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "Actor_400Regular"
  },
});

export default CreateTransaction;
