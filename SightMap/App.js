import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapContainer from './components/MapContainer'
import MarkerFormContainer from './components/MarkerFormContainer'

const Tab = createBottomTabNavigator()

const App = () => {
  return(
    <NavigationContainer>
       <Tab.Navigator initialRouteName="Marker"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Map') {
              iconName = 'ios-map';
            }else{
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
          <Tab.Screen name="Map" >
            {props => <MapContainer {...props}  />}
          </Tab.Screen >
          <Tab.Screen name="Marker" >
            {props => <MarkerFormContainer {...props}  />}
          </Tab.Screen >
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App