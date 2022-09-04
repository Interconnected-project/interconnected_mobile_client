import React, { useState } from 'react';
import { Button, ActivityIndicator } from 'react-native';
// @ts-ignore
import RNDisableBatteryOptimizationsAndroid from '@brandonhenao/react-native-disable-battery-optimizations-android';
import MyView from './common/MyView';
import MyText from './common/MyText';

function batteryOptimizationsEnabled() {
  return (
    <MyView>
      <MyText>Battery optimization is Enabled ❌</MyText>
      <Button
        title='Disable battery optimization'
        onPress={() =>
          RNDisableBatteryOptimizationsAndroid.enableBackgroundServicesDialogue()
        }
      />
    </MyView>
  );
}

function batteryOptimizationsDisabled() {
  return (
    <MyView>
      <MyText>Battery optimization is Disabled ✔</MyText>
    </MyView>
  );
}

export default function BatteryOptimizationsAndroid() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBatteryOptimizationAvailable, setIsBatteryOptimizationAvailable] =
    useState(true);
  const [isBatteryOptimizationDisabled, setIsBatteryOptimizationDisabled] =
    useState(true);

  RNDisableBatteryOptimizationsAndroid.isBatteryOptimizationEnabled().then(
    (isEnabled: boolean) => {
      setIsBatteryOptimizationAvailable(isEnabled);
      //TODO
      setIsBatteryOptimizationDisabled(false);
      setIsLoading(false);
    }
  );
  if (isLoading) {
    return <ActivityIndicator />;
  } else if (!isBatteryOptimizationAvailable || isBatteryOptimizationDisabled) {
    return batteryOptimizationsDisabled();
  } else {
    return batteryOptimizationsEnabled();
  }
}
