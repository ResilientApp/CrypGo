import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Home() {
  const navigation = useNavigation();

  // Function to navigate to the "Test" screen
  const goToLogin = () => {
    navigation.navigate("Login"); // "Test" is the name of the screen in your Stack Navigator
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

   const goToCreateTransaction = () => {
    navigation.navigate("Create Transaction");
  }
   
  const goToAllTransactions = () => {
    navigation.navigate("All Transactions");
  }

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Login" onPress={goToLogin} />
      <Button title="Register" onPress= {goToRegister} />
      <Button title="See all Transactions" onPress= {goToAllTransactions} />
      <Button title="Create Transaction" onPress= {goToCreateTransaction} />
      <Text> Sign out Button Comes here too </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
