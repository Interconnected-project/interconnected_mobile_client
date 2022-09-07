import React from 'react';

import MyStatusBar from './src/common/MyStatusBar';
import MyView from './src/common/MyView';
import WiFiConnection from './src/deviceStatus/WiFiConnection';
import BatteryOptimizationsAndroid from './src/deviceStatus/BatteryOptimizationsAndroid';
import BackgroundTaskSingleton from './src/background/BackgroundTaskSingleton';
import BatteryStatus from './src/deviceStatus/BatteryStatus';

export default function App() {
  BackgroundTaskSingleton.instance.start();
  return (
    <MyView>
      <MyStatusBar />
      <WiFiConnection />
      <BatteryStatus />
      <BatteryOptimizationsAndroid />
    </MyView>
  );
}
