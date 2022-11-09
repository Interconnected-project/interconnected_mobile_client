import React from 'react';
import { View } from 'react-native';
import styles from '../../common/styles';
import BatteryOptimization from './BatteryOptimization';

export default function Settings() {
  return (
    <View style={styles.app}>
      <BatteryOptimization />
    </View>
  );
}
