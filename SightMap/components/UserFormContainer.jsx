/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, Button, AsyncStorage,
} from 'react-native';
import Constants from 'expo-constants';
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
    <View style={styles.container}>
      <Text h1 style={styles.title}>Login form</Text>
      <TextInput style={styles.input} placeholder=" Full name" onChangeText={(text) => setName(text)} />
      <Button style={styles.button} title="Enter" onPress={() => handleSubmit()} />
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
  title: {
    fontSize: 25,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
});

export default UserFormContainer;
