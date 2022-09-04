import React, { useState } from 'react';
import { Button, ActivityIndicator } from 'react-native';
// @ts-ignore
import RNDisableBatteryOptimizationsAndroid from '@brandonhenao/react-native-disable-battery-optimizations-android';
import * as Battery from 'expo-battery';

import MyView from './common/MyView';
import MyText from './common/MyText';

function batteryOptimizationsActive() {
  return (
    <MyView>
      <MyText>Battery optimization is Enabled ❌</MyText>
      <Button
        title='Disable battery optimization'
        onPress={() => {
          RNDisableBatteryOptimizationsAndroid.enableBackgroundServicesDialogue();
        }}
      />
    </MyView>
  );
}

function batteryOptimizationsNotActive() {
  return (
    <MyView>
      <MyText>Battery optimization is Disabled ✔</MyText>
    </MyView>
  );
}

export default function BatteryOptimizationsAndroid() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBatteryOptimizationActive, setIsBatteryOptimizationActive] =
    useState(false);

  RNDisableBatteryOptimizationsAndroid.isBatteryOptimizationEnabled().then(
    (isEnabled: boolean) => {
      if (isEnabled) {
        Battery.isBatteryOptimizationEnabledAsync().then((value) => {
          setIsBatteryOptimizationActive(value);
          setIsLoading(false);
        });
      } else {
        setIsBatteryOptimizationActive(false);
        setIsLoading(false);
      }
    }
  );
  if (isLoading) {
    return <ActivityIndicator />;
  } else if (!isBatteryOptimizationActive) {
    return batteryOptimizationsNotActive();
  } else {
    return batteryOptimizationsActive();
  }
}
