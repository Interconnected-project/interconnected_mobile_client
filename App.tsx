import React from 'react';

import MyStatusBar from './src/common/MyStatusBar';
import MyView from './src/common/MyView';
import startBackgroundService from './src/backgroundService';
import WiFiConnection from './src/deviceStatus/WiFiConnection';
import BatteryOptimizationsAndroid from './src/deviceStatus/BatteryOptimizationsAndroid';

export default function App() {
  startBackgroundService();
  return (
    <MyView>
      <MyStatusBar />
      <WiFiConnection />
      <BatteryOptimizationsAndroid />
    </MyView>
  );
}
