/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import MapContainer from './components/MapContainer';
import MarkerFormContainer from './components/MarkerFormContainer';
import UserFormContainer from './components/UserFormContainer';
import UserContext from './UserContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  const getUserFromStorage = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserFromStorage();
  }, []);


  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="UserForm">
          <Stack.Screen name="UserForm" component={UserFormContainer} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Marker"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Map') {
          iconName = 'ios-map';
        } else {
          iconName = 'ios-list';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Map">
      {(props) => <MapContainer {...props} />}
    </Tab.Screen>
    <Tab.Screen name="Marker">
      {(props) => <MarkerFormContainer {...props} />}
    </Tab.Screen>
  </Tab.Navigator>
);

export default App;
