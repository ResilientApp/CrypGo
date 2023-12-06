import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import setButton from "../assets/testHome/setButton.svg";
import getButton from "../assets/testHome/getButton.svg";
import { useNavigation } from "@react-navigation/native";

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


  return (
    <View style={styles.container}>
      <View style={styles.logoutContainer}>
        <Text style={styles.logout} onPress={handleLogout}>Log Out</Text>
      </View>
      <Text style={styles.title}>HOME</Text>
      <View style={styles.subcontainer}>
        <View style={styles.button}>
          <SvgXml xml={getButton} onPress={goToAllTransactions}/>
        </View>
        <View style={styles.button}>
          <SvgXml xml={setButton} onPress={goToCreateTransactions}/>
        </View>
      </View>
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
    marginVertical: "10%",
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
})