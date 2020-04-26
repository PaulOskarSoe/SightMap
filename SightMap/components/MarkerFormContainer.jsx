/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
import React, { useState, useContext } from 'react';
import {
  View, TextInput, Button, StyleSheet, Alert, AsyncStorage,
} from 'react-native';
import { addMarker } from '../services';
import UserContext from '../UserContext';

const MarkerFormContainer = () => {
  const user = useContext(UserContext);

  const [description, setDescription] = useState();
  const [address, setAddress] = useState();

  const onSightSeeingAdded = () => {
    if (description && address) {
      Alert.alert('Success', `Sightseeing spot has been added to: ${address}`);
      setAddress('');
      setDescription('');
      addMarker(user._id, description, address);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="ex. Address, Town" style={styles.input} onChangeText={(text) => setAddress(text)} value={address} />
      <TextInput placeholder="description" style={styles.input} onChangeText={(text) => setDescription(text)} value={description} />
      <Button style={styles.button} title="Add the new spot" onPress={() => onSightSeeingAdded()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 100,
    backgroundColor: '#ff6347',
    padding: 7,
  },
  text: {
    color: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
});

export default MarkerFormContainer;
