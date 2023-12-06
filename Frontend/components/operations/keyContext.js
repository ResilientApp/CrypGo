// KeyContext.js
import { createContext, useContext, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const KeyContext = createContext();

const KeyProvider = ({ children }) => {
  const [publicKey, setPublicKey] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);

  const generateKeys = async () => {
    try {
      const postData = JSON.stringify({
        query: `mutation GenerateKeys {
            generateKeys {
              publicKey
              privateKey
            }
        }`,
        variables: {
        },
      });
  
      const response = await fetch('https://cloud.resilientdb.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: postData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      // Assuming the response structure is like { data: { generateKeys: { publicKey, privateKey } } }
      const { publicKey, privateKey } = data.data.generateKeys;
  
      const generatedPublicKey = publicKey;
      const generatedPrivateKey = privateKey;
  
      setPublicKey(generatedPublicKey);
      setPrivateKey(generatedPrivateKey);
      console.log('Public Key: ', generatedPublicKey);
      console.log('Private Key: ', generatedPrivateKey);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const setKeys = (newPublicKey, newPrivateKey) => {
    setPublicKey(newPublicKey);
    setPrivateKey(newPrivateKey);
  };

  const clearKeys = () => {
    setPublicKey(null);
    setPrivateKey(null);
  };

  return (
    <KeyContext.Provider value={{ publicKey, privateKey, generateKeys, setKeys, clearKeys }}>
      {children}
    </KeyContext.Provider>
  );
};

const useKey = () => {
  const context = useContext(KeyContext);
  if (!context) {
    throw new Error('useKey must be used within a KeyProvider');
  }
  return context;
};

export { KeyProvider, useKey };
