import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Feather from 'react-native-vector-icons/Feather';

import MyStatusBar from './src/common/MyStatusBar';
import Home from './src/Home';
import Settings from './src/Settings';

export default function App() {
  return (
    <NavigationContainer>
      <MyStatusBar />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarInactiveBackgroundColor: '#121212',
          tabBarActiveBackgroundColor: '#080808',
          tabBarInactiveTintColor: 'white',
          tabBarActiveTintColor: '#fab400',
        }}
      >
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Feather name='home' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Settings'
          component={Settings}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Feather name='settings' color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
