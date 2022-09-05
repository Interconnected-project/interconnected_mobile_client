import React, { useState, useEffect } from 'react';
import { ActivityIndicator, AppState } from 'react-native';

import BatteryOptimizationsActive from './BatteryOptimizationActive';
import BatteryOptimizationsNotActive from './BatteryOptimizationNotActive';
import batteryOptimizationListener from './batteryOptimizationListener';

export default function BatteryOptimizationsAndroid() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBatteryOptimizationActive, setIsBatteryOptimizationActive] =
    useState(false);

  useEffect(() => {
    AppState.addEventListener(
      'change',
      batteryOptimizationListener(setIsLoading, setIsBatteryOptimizationActive)
    );
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  } else if (isBatteryOptimizationActive) {
    return <BatteryOptimizationsActive />;
  } else {
    return <BatteryOptimizationsNotActive />;
  }
}
