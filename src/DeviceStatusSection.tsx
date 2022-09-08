import React from 'react';
import { View } from 'react-native';
import styles from './common/styles';

import BatteryOptimizationsAndroid from './deviceStatus/BatteryOptimizationsAndroid';
import WiFiConnection from './deviceStatus/WiFiConnection';

export default function DeviceStatusSection() {
  return (
    <View style={styles.deviceStatusSection}>
      <WiFiConnection />
      <BatteryOptimizationsAndroid />
    </View>
  );
}
