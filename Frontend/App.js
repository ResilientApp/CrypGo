import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import DashBoard from "./components/DashBoard";
import Test from "./components/Test";
import Settings from "./components/Settings";
import Login from "./components/Login";

const Stack = createStackNavigator();

export default function App() {
  return (
       <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DashBoard" component={DashBoard} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Login" component={Login} />
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
