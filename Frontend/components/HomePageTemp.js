import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import setButton from "../assets/testHome/setButton.svg";
import getButton from "../assets/testHome/getButton.svg";
import { useNavigation } from "@react-navigation/native";

function Login() {
  const navigation = useNavigation();

  // Function to navigate to the "Test" screen
  const goToTestScreen = () => {
    navigation.navigate("Test"); // "Test" is the name of the screen in your Stack Navigator
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoutContainer}>
        <Text style={styles.logout}>Log Out</Text>
      </View>
      <Text style={styles.title}>HOME</Text>
      <View style={styles.subcontainer}>
        <View style={styles.button}>
            <SvgXml xml={getButton} onPress={goToTestScreen}/>
        </View>
        <View style={styles.button}>
            <SvgXml xml={setButton} onPress={goToTestScreen}/>
        </View>
      </View>
    </View>
  );
}

export default Login;

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