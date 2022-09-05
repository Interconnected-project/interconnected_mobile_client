import React, { useState, useEffect } from 'react';
import { ActivityIndicator, AppState } from 'react-native';
// @ts-ignore
import RNDisableBatteryOptimizationsAndroid from '@brandonhenao/react-native-disable-battery-optimizations-android';
import * as Battery from 'expo-battery';
import BatteryOptimizationsActive from './batteryOptimization/BatteryOptimizationActive';
import BatteryOptimizationsNotActive from './batteryOptimization/BatteryOptimizationNotActive';

export default function BatteryOptimizationsAndroid() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBatteryOptimizationActive, setIsBatteryOptimizationActive] =
    useState(false);

  useEffect(() => {
    AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        setIsLoading(true);
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
      }
    });
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  } else if (!isBatteryOptimizationActive) {
    return <BatteryOptimizationsNotActive />;
  } else {
    return <BatteryOptimizationsActive />;
  }
}
