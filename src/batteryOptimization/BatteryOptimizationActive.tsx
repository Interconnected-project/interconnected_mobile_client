import React from 'react';
import { Button } from 'react-native';
import MyText from '../common/MyText';
import MyView from '../common/MyView';

import { NativeModules } from 'react-native';
const { BatteryOptimizationModule } = NativeModules;

export default function BatteryOptimizationsActive() {
  return (
    <MyView>
      <MyText>Battery optimization is Enabled ❌</MyText>
      <Button
        title='Disable battery optimization'
        onPress={() => {
          BatteryOptimizationModule.openBatteryOptimizationSettings();
        }}
      />
    </MyView>
  );
}
