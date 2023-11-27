
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import Home from "./components/Home";
import DashBoard from "./components/DashBoard";
import Test from "./components/Test";
import Operations from "./components/Operations";
import Register from "./components/Register";
import Login from "./components/Login";
import { createStackNavigator } from '@react-navigation/stack';
import GenerateKeys from "./components/operations/generatekeys";
import AllTransactions from "./components/operations/getalltransactions";
import CreateTransaction from "./components/operations/settransactions";
import UpdateTransaction from "./components/operations/updatetransaction";
import GetTransaction from "./components/operations/gettransactions";
import HomePageTemp from "./components/HomePageTemp";

const Stack = createStackNavigator();
export const ThemeContext = React.createContext();

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DashBoard" component={DashBoard} />
        <Stack.Screen name="Operations" component={Operations} />
        <Stack.Screen name="Test" component={Test} />   
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name= "Register" component={Register} />
        <Stack.Screen name="Generate Keys" component={GenerateKeys} />
        <Stack.Screen name= "All Transactions" component={AllTransactions} />
        <Stack.Screen name="Get Transaction" component={GetTransaction} />
        <Stack.Screen name="Create Transaction" component={CreateTransaction} />
        <Stack.Screen name="Update Transaction" component={UpdateTransaction} />
        <Stack.Screen name= "HomePage Temp" component={HomePageTemp} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

