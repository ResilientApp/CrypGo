import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from "react-native-svg";
import setButton from "../assets/testHome/setButton.svg";
import getButton from "../assets/testHome/getButton.svg";
import set from "../assets/testHome/set.svg";
import sett from "../assets/testHome/set.png";
import all from "../assets/testHome/all.svg";
import alll from "../assets/testHome/all.png";
import check from "../assets/testHome/checkmark.svg";
import settings from "../assets/testHome/settings.svg";
import logout from "../assets/testHome/logout.svg";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from 'expo-local-authentication';

function HomePageTemp() {
  const navigation = useNavigation();

  // Function to navigate to the "Test" screen
  const goToAllTransactions = () => {
    navigation.navigate("All Transactions");
  };

  // Function to handle logout
  const handleLogout = () => {
    navigation.navigate("Login")
  };

  // Function to navigate to the "Test" screen
  const goToCreateTransactions = () => {
    navigation.navigate("Create Transaction"); 
  };

  useEffect(() => {
    LocalAuthentication.authenticateAsync();
  })

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>HOME</Text>
        <Text style={styles.subtitle}>Your Dashboard</Text>
      </View>
      <View style={styles.img}> 
        <Image
          source={require('../assets/testHome/moneyy.png')}
        />
      </View>

      <View style={styles.subcontainer}>
        <View style={styles.subsubcontainer}>
          <TouchableOpacity style={styles.button} onPress={() => goToAllTransactions()}>
              {/* <SvgXml xml={all} onPress={goToTestScreen}/> */}
              <Image
                source={require('../assets/testHome/all.png') }
              />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => goToCreateTransactions()}>
            <Image
              source={require('../assets/testHome/set.png')}
            />
            {/* <SvgXml xml={set} onPress={goToTestScreen}/> */}
          </TouchableOpacity>
        </View>
        <View style={styles.subsubcontainer}>
          <View style={styles.button}>
              <SvgXml xml={settings}/>
          </View>
          <View style={styles.button}>
              <SvgXml xml={logout} onPress={handleLogout}/>
          </View>
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
    marginBottom: 0,
    marginTop: '10%',
    textAlign: 'center',
  },
  img: {
    marginTop: '-15%',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 16,
    marginTop: '0%',
    textAlign: 'center',
  },
  subcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginVertical: "-1%",
  },
  subsubcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: "2%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "12%",
    marginHorizontal: "3%",
    marginTop: "-10%",
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