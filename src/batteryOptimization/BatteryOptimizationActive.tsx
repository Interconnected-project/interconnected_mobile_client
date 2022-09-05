import React from 'react';
import { Button } from 'react-native';
import { RNDisableBatteryOptimizationsAndroid as AndroidBatteryOpt } from '@brandonhenao/react-native-disable-battery-optimizations-android';
import MyText from '../common/MyText';
import MyView from '../common/MyView';

export default function BatteryOptimizationsActive() {
  return (
    <MyView>
      <MyText>Battery optimization is Enabled ❌</MyText>
      <Button
        title='Disable battery optimization'
        onPress={() => {
          AndroidBatteryOpt.enableBackgroundServicesDialogue();
        }}
      />
    </MyView>
  );
}
