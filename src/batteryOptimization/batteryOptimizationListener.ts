import { AppStateStatus } from 'react-native';
import { NativeModules } from 'react-native';
const { BatteryOptimizationModule } = NativeModules;

export default function batteryOptimizationListener(
  setIsLoading: (v: React.SetStateAction<boolean>) => void,
  setIsBatteryOptimizationActive: (v: React.SetStateAction<boolean>) => void
) {
  return (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      setIsLoading(true);
      BatteryOptimizationModule.isBatteryOptimizationCurrentlyActive().then(
        (isActive: any) => {
          console.log(isActive);
          setIsBatteryOptimizationActive(isActive);
          setIsLoading(false);
        }
      );
    }
  };
}
