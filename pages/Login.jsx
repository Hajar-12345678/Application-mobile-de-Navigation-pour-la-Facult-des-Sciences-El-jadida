import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase-config';

const Login = ({ setIsAuth }) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsAuth(true);
      navigation.navigate('Lieux');
    } catch (error) {
      setError("Adresse e-mail ou mot de passe incorrect.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./logo.png')} style={styles.logo} />
      <View style={styles.loginPage}>
        <Text style={styles.title}>Connectez-vous</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder=" Adresse Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Se connecter" onPress={handleLogin} />
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
   
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: 20,
  },
  loginPage: {
    alignItems: 'center',
    padding: 20,
   marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1e9c2a',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default Login;