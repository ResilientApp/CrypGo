
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import {Alert, Button, StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Home from "./components/Home";
import DashBoard from "./components/DashBoard";
import Test from "./components/Test";
import Operations from "./components/Operations";
import Register from "./components/Register";
import Login from "./components/Login";
import { createStackNavigator } from "@react-navigation/stack";
import GenerateKeys from "./components/operations/generatekeys";
import AllTransactions from "./components/operations/getalltransactions";
import CreateTransaction from "./components/operations/settransactions";
import UpdateTransaction from "./components/operations/updatetransaction";
import GetTransaction from "./components/operations/gettransactions";
import HomePageTemp from "./components/HomePageTemp";
import { KeyProvider } from "./components/operations/keyContext";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
export const ThemeContext = React.createContext();

const getFonts=() =>
Font.loadAsync({
Actor_400Regular: require('./assets/fonts/Actor-Regular.otf'),
PalanquinDark: require('./assets/fonts/PalanquinDark-Regular.otf'),
DarkerGrotesque: require('./assets/fonts/DarkerGrotesque-Regular.ttf'),
ClashDisplay: require('./assets/fonts/ClashDisplay-Regular.otf'),
Mulish:require('./assets/fonts/Mulish-Regular.ttf')
});

export default function App() {
  const [user, setUser] = React.useState(null);
  const [fontsloaded, setFontsLoaded] = useState(false);

  
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await getFonts();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);
  if (!fontsloaded) {
    return null;
  } else {

  return (
    <KeyProvider>
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="HomePage Temp" component={HomePageTemp} />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />

            <Stack.Screen name="DashBoard" component={DashBoard} />
            <Stack.Screen name="Operations" component={Operations} />
            <Stack.Screen name="Test" component={Test} />
            <Stack.Screen name="Generate Keys" component={GenerateKeys} />
            <Stack.Screen name="All Transactions" component={AllTransactions} />
            <Stack.Screen name="Get Transaction" component={GetTransaction} />
            <Stack.Screen
              name="Create Transaction"
              component={CreateTransaction}
            />
            <Stack.Screen
              name="Update Transaction"
              component={UpdateTransaction}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </KeyProvider>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
