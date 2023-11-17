import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native"; 

function Operations() {
  const navigation = useNavigation();
  const goToUpdateTransactions = () => {
    navigation.navigate("Update Transaction");
  } 

  const goToGetTransaction = () => {
    navigation.navigate("Get Transaction");
  }

  return (
    <View style={styles.container}>
      <Text>Operations Page Work in Progress Do not Touch</Text>
      <Button title="Update Transactions" onPress={goToUpdateTransactions}/>
      <Button title="Get Transaction" onPress={goToGetTransaction} />
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



export default Operations;
