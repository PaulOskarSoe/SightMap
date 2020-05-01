/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getMarkers } from '../services';

const MapContainer = () => {
  const [markers, updateMarkers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllMarkers();
    }, 5000);
    getAllMarkers();
    return () => clearInterval(interval);
  }, []);

  const getAllMarkers = async () => {
    const newMarker = await getMarkers();
    updateMarkers(newMarker.markers);
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 59.4370,
          longitude: 24.753574,
          latitudeDelta: 0.0992,
          longitudeDelta: 0.0421,
        }}
        style={styles.mapStyle}
      >
        {markers && markers.map((marker) => (
          marker && (
          <Marker
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            description={marker.description}
          />
          )
        ))}
      </MapView>
    </View>
  );
};

export default MapContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
