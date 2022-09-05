import { AppStateStatus } from 'react-native';
import RNDisableBatteryOptimizationsAndroid from '@brandonhenao/react-native-disable-battery-optimizations-android';
import * as Battery from 'expo-battery';

export default function batteryOptimizationListener(
  setIsLoading: (v: React.SetStateAction<boolean>) => void,
  setIsBatteryOptimizationActive: (v: React.SetStateAction<boolean>) => void
) {
  return (nextAppState: AppStateStatus) => {
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
  };
}
