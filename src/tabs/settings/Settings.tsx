import React from 'react';
import { View } from 'react-native';
import styles from '../../common/styles';
import AndroidAutostart from './AndroidAutostart';
import BatteryOptimization from './BatteryOptimization';

export default function Settings() {
  return (
    <View style={styles.app}>
      <BatteryOptimization />
      <AndroidAutostart />
    </View>
  );
}
