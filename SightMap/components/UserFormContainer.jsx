/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import {
  View, TextInput, StyleSheet, AsyncStorage,
} from 'react-native';
import Constants from 'expo-constants';
import {
  Card, Input, Text, Icon, Button,
} from 'react-native-elements';
import { addUser } from '../services';

const { deviceId } = Constants;

const UserFormContainer = ({ navigation }) => {
  const [fullName, setFullName] = useState(null);

  const setName = (text) => {
    setFullName(text);
  };

  const handleSubmit = () => {
    addUser({ fullName, deviceId })
      .then((doc) => storeUser(doc))
      .catch((err) => console.log(err));
  };

  const storeUser = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      checkUser();
    } catch (error) {
      console.log(error);
    }
  };

  // If user exists go to app and reset navigation
  const checkUser = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      navigation.navigate('TabNavigator');
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Card
      style={styles.container}
      title={(
        <View style={styles.cardTitle}>
          <Text style={styles.cardText1}>WELCOME!</Text>
          <Text style={styles.cardText2}>LOG IN</Text>
        </View>
 )}
    >
      <View style={styles.container}>
        <Input
          leftIcon={{ type: 'evilicon', name: 'user' }}
          placeholder=" Full name"
          onChangeText={(text) => setName(text)}
        />
        <Button raised="true" title="SUBMIT" onPress={() => handleSubmit()} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  cardTitle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText2: {
    fontSize: 26,
    marginBottom: '10%',
  },
  cardText1: {
    fontSize: 18,
    marginBottom: '5%',
    color: '#021240',
  },
});

export default UserFormContainer;
