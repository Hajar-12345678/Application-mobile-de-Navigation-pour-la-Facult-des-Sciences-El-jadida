import React, { useState } from 'react';
import { View,ScrollView,Image,TouchableOpacity, Text,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const locations = [
   // {name:"faculter des science",coordinates: { latitude: 33.2258, longitude: -8.4867 }},
    { name: "Administration", coordinates: { latitude: 33.22651, longitude: -8.486939 } },
    { name: "Bibliothèque 1", coordinates: { latitude: 33.226328, longitude: -8.487133 } },
    { name: "Parking", coordinates: { latitude: 33.226615, longitude: -8.48742 } },
    { name: "Garage", coordinates: { latitude: 33.226872, longitude: -8.486474 } },
    { name: "Entrée Parking", coordinates: { latitude: 33.226872, longitude: -8.486474 } },
    { name: "Atelier", coordinates: { latitude: 33.226542, longitude: -8.486402 } },
    { name: "Entrée Etudiant", coordinates: { latitude: 33.226427, longitude: -8.486117 } },
    { name: "Entrée Principale", coordinates: { latitude: 33.226161, longitude: -8.485992 } },
    { name: "Amphi 1 Al Farabi", coordinates: { latitude: 33.226165, longitude: -8.48664 } },
    { name: "Amphi 2 Al Bayrouni", coordinates: { latitude: 33.22585, longitude: -8.4871 } },
    { name: "Amphi 3 Ibno Haitam", coordinates: { latitude: 33.225521, longitude: -8.487151 } },
    { name: "Cafétéria des enseignants", coordinates: { latitude: 33.226219, longitude: -8.48753 } },
    { name: "Amphi Ibno Nafiss", coordinates: { latitude: 33.225703, longitude: -8.485969 } },
    { name: "Affichage", coordinates: { latitude: 33.225655, longitude: -8.485769 } },
    { name: "Bloc A", coordinates: { latitude: 33.225345, longitude: -8.48567 } },
    { name: "Bloc B", coordinates: { latitude: 33.22539, longitude: -8.485967 } },
    { name: "Bloc C", coordinates: { latitude: 33.226161, longitude: -8.488013 } },
    { name: "Bloc D", coordinates: { latitude: 33.22583, longitude: -8.488338 } },
    { name: "Toilette 1", coordinates: { latitude: 33.22517, longitude: -8.48556 } },
    { name: "Cafétéria des Etudiants", coordinates: { latitude: 33.22506, longitude: -8.48575 } },
    { name: "Amphi Ibn Younes", coordinates: { latitude: 33.22508, longitude: -8.48611 } },
    { name: "Département de biologie", coordinates: { latitude: 33.22478, longitude: -8.48592 } },
    { name: "Département de chimie", coordinates: { latitude: 33.22442, longitude: -8.48592 } },
    { name: "Animalerie", coordinates: { latitude: 33.224507, longitude: -8.486489 } },
    { name: "Toilette 2", coordinates: { latitude: 33.22478, longitude: -8.48725 } },
    { name: "Département de Physique / Géologie", coordinates: { latitude: 33.22575, longitude: -8.48778 } },
    { name: "Département de Mathématique", coordinates: { latitude: 33.22522, longitude: -8.48817 } },
    { name: "Département de Géologie", coordinates: { latitude: 33.22528, longitude: -8.48772 } },
    { name: "Département Informatique", coordinates: { latitude: 33.22489, longitude: -8.48764 } },
    { name: "Bibliothèque 2", coordinates: { latitude: 33.225, longitude: -8.48844 } },
  ];
  const ListeDeLieux = ({ lieux }) => {
    return (
      <ScrollView contentContainerStyle={styles.listContainer}>

            {lieux.map((lieu, index) => (
                <View key={index} style={styles.lieuContainer}>
                    <Text style={styles.lieuText}>{lieu.name}</Text>
                    {/* Affichez d'autres informations sur le lieu si nécessaire */}
                </View>
            ))}
       </ScrollView>
    );
};

export default function Lieux() {
    const navigation = useNavigation();
    const [currentList, setCurrentList] = useState([]);

    const handleViewOnMap = () => {
        navigation.navigate('Map');
    };

    const afficherListe = (type) => {
        let filteredLocations;
        if (type.toLowerCase() === "autre") {
            filteredLocations = locations.filter(lieu =>
                !lieu.name.toLowerCase().includes("département") &&
                !lieu.name.toLowerCase().includes("amphi") &&
                !lieu.name.toLowerCase().includes("bloc")
            );
        } else {
            filteredLocations = locations.filter(lieu => lieu.name.toLowerCase().includes(type.toLowerCase()));
        }
        setCurrentList(filteredLocations);
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Exploration des lieux</Text>
        <TouchableOpacity style={styles.mapButton} onPress={handleViewOnMap}>
          <Image source={require('./pin1.png')} style={styles.icon} />
        </TouchableOpacity>
        <ScrollView style={styles.buttonContainer} horizontal={true}>
          <TouchableOpacity style={styles.button} onPress={() => afficherListe("département")}>
            <Image source={require('./dep.jpeg')} style={styles.image} />
            <Text style={styles.buttonText}>Départements</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => afficherListe("amphi")}>
            <Image source={require('./emphi.jpeg')} style={styles.image} />
            <Text style={styles.buttonText}>Amphies</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => afficherListe("bloc")}>
            <Image source={require('./bloc.jpeg')} style={styles.image} />
            <Text style={styles.buttonText}>Blocs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => afficherListe("autre")}>
            <Image source={require('./auth.jpeg')} style={styles.image} />
            <Text style={styles.buttonText}>Autres lieux</Text>
          </TouchableOpacity>
        </ScrollView>
        <ListeDeLieux lieux={currentList} />
        
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f0f0f0',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 90,
      color: '#0579f5',
      marginTop: 80,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      marginTop: -60,
    },
    button: {
      marginHorizontal: 10,
      alignItems: 'center',
      marginBottom:20,
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 10,
      marginBottom: 10,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    icon: {
      width: 40,
      height: 40,
      tintColor: '#0f6e13',
      position: 'absolute',
      top: 10,
      right: 10,
    },
    mapButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: '#f7fcf8',
      padding: 10,
      borderRadius: 100,
      margin: 10,
      marginBottom: 90,
      marginTop: 5,
    },
     listContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingBottom:-40,
  
      },
     
      lieuContainer: {
        backgroundColor: '#e6f7fa',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#cccccc',
      },
      lieuText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
      },
});