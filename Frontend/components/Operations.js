import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native"; 

function Operations() {
  const navigation = useNavigation();
  const goToGenerateKeys = () => {
    navigation.navigate("Generate Keys");
  } 

  return (
    <View style={styles.container}>
      <Text>Operations Page Work in Progress Do not Touch</Text>
      <Button title="Go to GenerateKeys" onPress={goToGenerateKeys}/>
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
