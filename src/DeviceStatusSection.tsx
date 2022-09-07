import React from 'react';
import { View } from 'react-native';
import styles from './common/styles';

import BatteryOptimizationsAndroid from './deviceStatus/BatteryOptimizationsAndroid';
import BatteryStatus from './deviceStatus/BatteryStatus';
import WiFiConnection from './deviceStatus/WiFiConnection';

export default function DeviceStatusSection() {
  return (
    <View style={styles.deviceStatusSection}>
      <WiFiConnection />
      <BatteryStatus />
      <BatteryOptimizationsAndroid />
    </View>
  );
}
