import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from "react-native-svg";
import setButton from "../assets/testHome/setButton.svg";
import getButton from "../assets/testHome/getButton.svg";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from 'expo-local-authentication';

function HomePageTemp() {
  const navigation = useNavigation();

  // Function to navigate to the "Test" screen
  const goToAllTransactions = () => {
    navigation.navigate("All Transactions"); // "Test" is the name of the screen in your Stack Navigator
  };

  // Function to handle logout
  const handleLogout = () => {
    navigation.navigate("Login")
    // You may also want to navigate to the login screen or perform any other actions after signing out
  };

  // Function to navigate to the "Test" screen
  const goToCreateTransactions = () => {
    navigation.navigate("Create Transaction"); // "Test" is the name of the screen in your Stack Navigator
  };

  useEffect(() => {
    LocalAuthentication.authenticateAsync();
  })

  return (
    <View style={styles.container}>
      <View style={styles.logoutContainer}>
        <Text style={styles.logout} onPress={handleLogout}>Log Out</Text>
      </View>
      <View>
        <Text style={styles.title}>HOME</Text>
        <Text style={styles.subtitle}>Your Dashboard</Text>
      </View>
      <View style={styles.img}> 
        <Image
          source={require('../assets/testHome/moneyy.png')}
        />
      </View>
      <LinearGradient
      colors={['#32cd32','#228b22']}
      style={{width: '80%',justifyContent: 'center',alignItems: 'center',paddingVertical: 10,borderRadius: 20,marginBottom: 20,}}
      >
        
        <TouchableOpacity onPress={goToAllTransactions}>
        <Text style={styles.createButtonText}> View All Transactions</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
      colors={['#32cd32','#228b22']}
      style={{width: '80%',justifyContent: 'center',alignItems: 'center',paddingVertical: 10,borderRadius: 20,marginBottom: 20,}}
      >
        
        <TouchableOpacity onPress={goToCreateTransactions}>
        <Text style={styles.createButtonText}>Create Transaction</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

export default HomePageTemp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    marginTop: '30%',
    textAlign: 'center',
  },
  subcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoutContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 16,
  },
  logout: {
    fontSize: 17,
    color: '#fff',
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "Actor_400Regular"
  },
})