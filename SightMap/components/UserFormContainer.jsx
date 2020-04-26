import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet, Button} from "react-native";
import Constants from 'expo-constants';

const { deviceId } = Constants;

const UserFormContainer = () => {

    const handleSubmit = () => {
      console.debug(deviceId);
    };
    return(
        <View style={styles.container}>
            <Text h1 style={styles.title}>Login form</Text>
            <TextInput style={styles.input} placeholder=" Full name"/>
            <Button style={styles.button} title="Enter" onPress={() => handleSubmit()}/>
        </View>
    )
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
        fontSize: 25
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