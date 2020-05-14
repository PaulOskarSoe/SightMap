/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
import React, { useState, useContext } from 'react';
import {
  View, TextInput, StyleSheet,
} from 'react-native';
import { addMarker } from '../services';
import UserContext from '../UserContext';
import { Card, Input, Text, Icon, Button } from 'react-native-elements';

const MarkerFormContainer = () => {
  const user = useContext(UserContext);
  const [description, setDescription] = useState();
  const [address, setAddress] = useState();

  const onSightSeeingAdded = () => {
    if (user && user._id && address) {
      setAddress('');
      setDescription('');
      addMarker(user._id, description, address);
    }
  };

  return (
  <View>
  <Card title={
    <View style={styles.cardTitle}>
        <Text style={styles.cardText}>ADD THE NEW SPOT</Text>
        <Icon
          name='location'
          type='evilicon'
          color='#517fa4'
          reverse='true'
        />
    </View>
  } containerStyle={styles.card} >

    <View>
      <Input placeholder="ex. Address, Town" onChangeText={(text) => setAddress(text)} value={address} />
      <Input placeholder="description (max 128 characters)" onChangeText={(text) => setDescription(text)} value={description} maxLength={128} />
      <Button raised="true" onPress={() => onSightSeeingAdded()} title="SAVE"></Button>
     </View>
   </Card>
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
  text: {
    color: 'white',
  },
  card: {
    padding: '10%',
  },
  cardContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
  cardTitle: {
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 26,
  }
});

export default MarkerFormContainer;
