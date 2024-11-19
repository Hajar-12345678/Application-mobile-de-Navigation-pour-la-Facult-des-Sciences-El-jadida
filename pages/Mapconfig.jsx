import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert, TextInput } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase-config";
import MapViewDirections from 'react-native-maps-directions';
import locationMarkerImage from './pin.png';
import locationMarkerImage1 from './pin1.png';
import * as Location from 'expo-location';
import { Image } from 'react-native';

const facultyCoordinates = {
  latitude: 33.2258,
  longitude: -8.4867,
};

GOOGLE_MAPS_API_KEY = 'AIzaSyCT71cEhPngYk42VTKY7O5VpUV3yP5w6bI'

export default function Mapconfig() {
  const [mapType, setMapType] = useState("standard");
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState('');
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [markersData, setMarkersData] = useState([]);
  const mapViewRef = useRef(null);

  useEffect(() => {
    const fetchMarkersData = async () => {
      try {
        const markersCollectionRef = collection(db, 'localisation');
        const markersSnapshot = await getDocs(markersCollectionRef);
        const markersList = markersSnapshot.docs.map(doc => doc.data());
        setMarkersData(markersList);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchMarkersData();
  }, []);

  useEffect(() => {
    const checkUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'L\'application a besoin de la permission pour accéder à votre position.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    };

    checkUserLocation();

    return () => {
      // Nettoyer les écouteurs lorsque le composant est démonté
      Location.stopLocationUpdatesAsync('locationListener');
    };
  }, []);
  const toggleMapType = () => {
    setMapType((prevMapType) =>
      prevMapType === "standard" ? "satellite" : "standard"
    );
  };

  const getDestinationCoordinates = () => {
    try {
      // Convertir la destination en minuscules et supprimer les accents
      const lowerCaseDestination = destination.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
      // Recherche de la destination dans la liste des lieux
      const destinationLocation = markersData.find(
        loc => {
          // Convertir le nom du lieu en minuscules et supprimer les accents
          const lowerCaseLocationName = loc.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          // Comparaison des noms de lieux
          return lowerCaseLocationName === lowerCaseDestination;
        }
      );
  
      if (destinationLocation) {
        setDestinationCoordinates(destinationLocation.coordinates);
      } else {
        Alert.alert('Destination invalide', 'Veuillez sélectionner une destination valide.');
      }
    } catch (error) {
      console.error('Erreur de géocodage de la destination:', error);
    }
  };

  useEffect(() => {
    if (destinationCoordinates && userLocation) {
      mapViewRef.current.fitToCoordinates([userLocation, destinationCoordinates], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }
  }, [destinationCoordinates, userLocation]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        minZoomLevel={17}
        maxZoomLevel={20}
        mapType={mapType}
        style={styles.map}
        initialRegion={{
          ...facultyCoordinates,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker
          coordinate={facultyCoordinates}
          title="Faculté des Sciences el jadida "
          description="El jadida, Maroc"
          image={locationMarkerImage1}
        >
          <Callout>
            <Text>Faculté des Sciences</Text>
          </Callout>
        </Marker>

        {markersData.map((item, index) => (
          <Marker
            key={index}
            coordinate={item.coordinates}
            title={item.name}
            image={locationMarkerImage}
          >
            <Callout>
              <Text>{item.name}</Text>
            </Callout>
          </Marker>
        ))}

        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Votre position"
            pinColor="blue"
          />
        )}

        {destinationCoordinates && userLocation && (
          <MapViewDirections
            origin={userLocation}
            destination={destinationCoordinates}
            apikey={'AIzaSyCT71cEhPngYk42VTKY7O5VpUV3yP5w6bI'}
            strokeWidth={4}
            strokeColor="#057d25"
            mode="WALKING"
          />
        )}

{destinationCoordinates && (
  <Marker
    coordinate={destinationCoordinates}
    title={markersData.find(item => item.coordinates.latitude === destinationCoordinates.latitude && item.coordinates.longitude === destinationCoordinates.longitude)?.name || "Votre Destination"}
  />
)}
     
      </MapView>

      <TextInput
        style={styles.destinationInput}
        value={destination}
        onChangeText={setDestination}
        placeholder="Entrez votre destination"
      />

    

<TouchableOpacity style={styles.getDirectionsButton} onPress={getDestinationCoordinates}>
  <Image
    source={require('./position.png')} 
    style={styles.buttonIcon} 
  />
</TouchableOpacity>
<TouchableOpacity style={styles.mapTypeButton} onPress={toggleMapType}>
  <Image
    source={require('./gps.png')} 
    style={styles.buttonIcon} 
  />
  
</TouchableOpacity>



    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  map: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  destinationInput: {
    position: 'absolute',
    top: 35,
    left: 30,
    right: 70,
    marginHorizontal: 'auto',
    width: '320px',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    elevation: 2,
  },
  getDirectionsButton: {
    position: "absolute",
    bottom: 80,
    right: 16,
    backgroundColor: "#e3e1e1",
  
  },
  getDirectionsButtonText: {
    fontWeight: "bold",
    color: "#fff",
  },
  mapTypeButton: {
    position: "absolute",
    bottom: 30,
    right: 16,
    backgroundColor: "#e3e1e1",
    
  },
  buttonIcon:{
    width: 40,
    height:40,
    marginLeft: 5, 
  },
  

});
