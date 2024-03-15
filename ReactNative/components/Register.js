import React, { useState,  useEffect, useCallback  } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import { useKey } from './operations/keyContext';
import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';


const fetchFonts = () => {
  return Font.loadAsync({
    'Actor_400Regular': require('../assets/fonts/Actor-Regular.otf'),
    'PalanquinDark': require('../assets/fonts/PalanquinDark-Regular.otf'),
    'DarkerGrotesque': require('../assets/fonts/DarkerGrotesque-Regular.ttf'),
    'ClashDisplay': require('../assets/fonts/ClashDisplay-Regular.otf')
  });
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { generateKeys } = useKey();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
      generateKeys();
      navigation.navigate('HomePage Temp');
  };
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>
      <Text style={styles.subtitle}>Enter Your Details</Text>

      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Enter the username"
        placeholderTextColor="#aaaaaa"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Create Password"
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm Password"
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        autoCapitalize="none"
      />

      <LinearGradient
      colors={['#32cd32','#228b22']}
      style={{width: '80%',justifyContent: 'center',alignItems: 'center',paddingVertical: 10,borderRadius: 20,marginBottom: 20, marginTop: 30}}
      >
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: 8,
    color: '#fff',
    marginBottom: 24,
    fontFamily: 'PalanquinDark'
  },
  subtitle: {
    fontSize: 25,
    color: '#fff',
    marginBottom: 48,
    fontFamily: 'DarkerGrotesque'
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#fffaf0',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#fff',
    marginBottom: 24,
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;