import React from 'react';
import { View } from 'react-native';

import styles from './src/common/styles';
import MyStatusBar from './src/common/MyStatusBar';
import LogoSection from './src/LogoSection';

import BatterySection from './src/deviceStatus/BatterySection';
import ConnectivitySection from './src/deviceStatus/ConnectivitySection';
import AndroidSection from './src/deviceStatus/AndroidSection';
import BacgroundTaskSwitch from './src/BackgroundTaskSwitch';
import GridStatus from './src/GridStatus';

export default function App() {
  return (
    <View style={styles.app}>
      <MyStatusBar />
      <LogoSection />
      <GridStatus />
      <BacgroundTaskSwitch />
      <BatterySection />
      <ConnectivitySection />
      <AndroidSection />
    </View>
  );
}
