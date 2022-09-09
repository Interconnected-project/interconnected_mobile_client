import React from 'react';
import { Button, NativeModules, View } from 'react-native';

import MyLegend from '../../common/MyLegend';
import styles from '../../common/styles';
const { BatteryOptimizationModule } = NativeModules;

export default function BatteryOptimization() {
  return (
    <View style={styles.settingsSection}>
      <MyLegend>Android battery optimization:</MyLegend>
      <Button
        title='Disable battery optimization'
        onPress={() => {
          BatteryOptimizationModule.openBatteryOptimizationSettings();
        }}
      />
    </View>
  );
}
