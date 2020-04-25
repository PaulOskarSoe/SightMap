/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import {
  View, TextInput, Button, StyleSheet, Alert,
} from 'react-native';
import { addMarker } from '../services';

const MarkerFormContainer = () => {
  const [description, setDescription] = useState();
  const [address, setAddress] = useState();


  const onSightSeeingAdded = () => {
    if (description && address) {
      Alert.alert('Success', `Sightseeing spot has been added to: ${address}`);
      setAddress('');
      setDescription('');
      addMarker('5ea2f62faa15094dd49b68a7', description, address);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput placeholder="address" style={styles.input} onChangeText={(text) => setAddress(text)} value={address} />
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
