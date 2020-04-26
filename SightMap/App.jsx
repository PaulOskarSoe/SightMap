/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import MapContainer from './components/MapContainer';
import MarkerFormContainer from './components/MarkerFormContainer';
import UserFormContainer from "./components/UserFormContainer";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="UserForm" component={UserFormContainer} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

const TabNavigator = () => {
    return (
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
    )
};

export default App;
