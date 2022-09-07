import React from 'react';
import { View } from 'react-native';

import styles from './src/common/styles';
import MyStatusBar from './src/common/MyStatusBar';
import LogoSection from './src/LogoSection';
import DeviceStatus from './src/DeviceStatusSection';

import BackgroundTaskSingleton from './src/background/BackgroundTaskSingleton';

export default function App() {
  BackgroundTaskSingleton.instance.start();
  return (
    <View style={styles.app}>
      <MyStatusBar />
      <LogoSection />
      <DeviceStatus />
    </View>
  );
}
