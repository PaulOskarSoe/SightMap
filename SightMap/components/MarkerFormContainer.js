import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

const MarkerFormContainer = () => {
  
  const [description, setDescription] = useState()
  const [address, setAddress] = useState()

  const onSightSeeingAdded = () => {
    console.log('Added')
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="address" style={styles.input} onChangeText={text => setAddress(text)} value={address}></TextInput>
      <TextInput placeholder="description" style={styles.input} onChangeText={text => setDescription(text)} value={description}></TextInput>
      <Button style={styles.button} title="Add new sightseeing" onPress={() => onSightSeeingAdded()}>
      </Button>
    </View>
  )
}

export default MarkerFormContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginBottom: 100,
    backgroundColor: "#ff6347",
    padding: 7,
  },
  text: {
    color: 'white',
  },
  input: {
    width:'80%', 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    margin: 10
  }
});