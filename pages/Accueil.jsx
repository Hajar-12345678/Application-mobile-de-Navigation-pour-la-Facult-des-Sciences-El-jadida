import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Accueil = () => {
  const navigation = useNavigation();

  const handleAuthentication = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('./im1.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('./logo.png')}
            style={styles.logo}
          />
        </View>
        
        <View style={styles.header}>
  <Text style={styles.title}>Bienvenue</Text>
  <TouchableOpacity onPress={handleAuthentication} style={styles.button}>
    <Text style={styles.buttonText}>Commencer</Text>
  </TouchableOpacity>
</View>
      </View>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 90,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    left: 8,
    borderWidth: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  header: {
    position: 'absolute',
    bottom: 170,
    left: 25, 
    alignItems: 'center', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0a780f',
  },
  
 
  buttonText: {
    color: '#fcfcfc',
    fontSize: 18,
   
  },
  button: {
    backgroundColor: '#3b7df5',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
});

export default Accueil;
