import { AppStateStatus } from 'react-native';
import { NativeModules } from 'react-native';
const { BatteryOptimizationModule } = NativeModules;

export default function batteryOptimizationListener(
  setIsLoading: (v: React.SetStateAction<boolean>) => void,
  setIsBatteryOptimizationActive: (v: React.SetStateAction<boolean>) => void
) {
  return (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      BatteryOptimizationModule.isBatteryOptimizationCurrentlyActive().then(
        (isActive: any) => {
          setIsBatteryOptimizationActive(isActive);
          setIsLoading(false);
        }
      );
    }
  };
}
