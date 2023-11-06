import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Home() {
  const navigation = useNavigation();

  // Function to navigate to the "Test" screen
  const goToTestScreen = () => {
    navigation.navigate("Test"); // "Test" is the name of the screen in your Stack Navigator
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Go to Test" onPress={goToTestScreen} />
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
