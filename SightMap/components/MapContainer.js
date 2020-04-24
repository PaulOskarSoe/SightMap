import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps'

const MapContainer = () => {
  return (
    <View style={styles.container}>
      <MapView
       region = 
       {{
          latitude: 59.4370,
          longitude: 24.753574,
          latitudeDelta: 0.0992,
          longitudeDelta: 0.0421,
       }} 
      style={styles.mapStyle}
      >
      </MapView>
    </View>
  )
}

export default MapContainer

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
  }
})