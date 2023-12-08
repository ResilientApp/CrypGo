import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { SvgXml } from "react-native-svg";
import set from "../assets/testHome/set.svg";
import sett from "../assets/testHome/set.png";
import all from "../assets/testHome/all.svg";
import alll from "../assets/testHome/all.png";
import check from "../assets/testHome/checkmark.svg";
import settings from "../assets/testHome/settings.svg";
import logout from "../assets/testHome/logout.svg";
import { useNavigation } from "@react-navigation/native";

function Login() {
  const navigation = useNavigation();

  // Function to navigate to the "Test" screen
  const goToTestScreen = () => {
    navigation.navigate("Test"); // "Test" is the name of the screen in your Stack Navigator
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.logoutContainer}>
        <Text style={styles.logout}>Log Out</Text>
      </View> */}
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
          <View style={styles.button}>
              {/* <SvgXml xml={all} onPress={goToTestScreen}/> */}
              <Image
                source={require('../assets/testHome/all.png')}
              />

          </View>
          <View style={styles.button}>
            <Image
              source={require('../assets/testHome/set.png')}
            />
            {/* <SvgXml xml={set} onPress={goToTestScreen}/> */}
          </View>
        </View>
        <View style={styles.subsubcontainer}>
          <View style={styles.button}>
              <SvgXml xml={settings} onPress={goToTestScreen}/>
          </View>
          <View style={styles.button}>
              <SvgXml xml={logout} onPress={goToTestScreen}/>
          </View>
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