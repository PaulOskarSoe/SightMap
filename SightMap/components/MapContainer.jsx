/* eslint-disable no-use-before-define */
/* eslint no-underscore-dangle: 0 */
import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, Dimensions, Text, Button, Alert, AsyncStorage,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {
  getMarkers, getUserById, getMarkerById, deleteMarker,
} from '../services';

const MapContainer = () => {
  const [user, setUser] = useState(null);
  const [markers, updateMarkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState({});
  const [markerUser, setMarkerUser] = useState({});

  const getUserFromStorage = async () => {
    try {
      const userFromStorage = await AsyncStorage.getItem('user');
      const userObj = JSON.parse(userFromStorage);
      setUser(userObj);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserFromStorage();
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

  const selectMarker = async (markerId) => {
    try {
      const { marker } = await getMarkerById(markerId);
      const userFromMarker = await getUserById(marker.userId);
      setSelectedMarker(marker);
      setMarkerUser(userFromMarker);
      handleModal();
    } catch (e) {
      console.debug(e);
    }
  };

  const handleModal = () => setModalVisible(!modalVisible);

  const deleteUserMarker = async () => {
    try {
      const response = await deleteMarker(selectedMarker._id, user._id);
      if (response) {
        Alert.alert('Success', 'Marker successfully deleted');
        handleModal();
        getAllMarkers();
      }
    } catch (e) {
      console.debug(e);
      Alert.alert('Failure', 'Failed deleting marker');
    }
  };
  return (
    <View style={styles.container}>
      <Modal
        isVisible={modalVisible}
      >
        <View style={{ flex: 1 }}>
          <Button title="Close" onPress={handleModal} color="#ff7474" />
          <View style={styles.textContainer}>
            <ModalContent
              text={markerUser.fullName}
              header="OWNER"
              userId={user ? user._id : null}
              markerUserId={markerUser ? markerUser._id : null}
            />
            <ModalContent
              text={selectedMarker.address}
              header="ADDRESS"
            />
            <ModalContent
              text={selectedMarker.description}
              header="DESCRIPTION"
            />
            {user && markerUser && user._id === markerUser._id && <Button title="DELETE" color="#ec2f2f" onPress={deleteUserMarker} />}
          </View>
        </View>
      </Modal>
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
            key={marker._id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            description={marker.description}
            onPress={() => selectMarker(marker._id)}
          />
          )
        ))}
      </MapView>
    </View>
  );
};

const ModalContent = (props) => {
  const {
    text, header, userId, markerUserId,
  } = props;
  return (
    <View style={styles.textContentContainer}>
      <View style={styles.textHeader}>
        <Text style={styles.headerText}>{header}</Text>
      </View>
      <View style={styles.textContent}>
        <Text style={styles.text}>{`${text} ${userId === markerUserId ? '(You)' : ''}`}</Text>
      </View>
    </View>
  );
};

ModalContent.propTypes = {
  text: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  userId: PropTypes.string,
  markerUserId: PropTypes.string,
};

ModalContent.defaultProps = {
  userId: 'userId',
  markerUserId: 'markerUserId',
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
  textContainer: {
    backgroundColor: '#fff',
    marginTop: 20,
    flex: 1,
    padding: 18,
    borderRadius: 6,
  },
  textHeader: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: '#c64242',
    padding: 4,
    paddingLeft: 10,
  },
  headerText: {
    color: '#fff',
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
  textContent: {
    padding: 4,
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  textContentContainer: {
    marginBottom: 20,
  },
});
