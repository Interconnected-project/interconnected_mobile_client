import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Feather from 'react-native-vector-icons/Feather';

import MyStatusBar from './src/common/MyStatusBar';
import Home from './src/tabs/home/Home';
import Settings from './src/tabs/settings/Settings';

const navigationContainerTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: '#080808',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navigationContainerTheme}>
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
