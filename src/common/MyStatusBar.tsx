import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';

export default function MyStatusBar() {
  const isDarkMode = useColorScheme() === 'dark';
  return <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />;
}
