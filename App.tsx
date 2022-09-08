import React from 'react';
import { View } from 'react-native';

import styles from './src/common/styles';
import MyStatusBar from './src/common/MyStatusBar';
import LogoSection from './src/LogoSection';
import DeviceStatusSection from './src/DeviceStatusSection';

import BackgroundTaskSingleton from './src/background/BackgroundTaskSingleton';
import BatterySection from './src/deviceStatus/BatterySection';

export default function App() {
  BackgroundTaskSingleton.instance.start();
  return (
    <View style={styles.app}>
      <MyStatusBar />
      <LogoSection />
      <DeviceStatusSection />
      <BatterySection />
    </View>
  );
}
