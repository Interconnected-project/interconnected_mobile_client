import React from 'react';

import MyStatusBar from './src/common/MyStatusBar';
import MyView from './src/common/MyView';
import BatteryOptimizationsAndroid from './src/batteryOptimization/BatteryOptimizationsAndroid';
import startBackgroundService from './src/backgroundService';

export default function App() {
  startBackgroundService();
  return (
    <MyView>
      <MyStatusBar />
      <BatteryOptimizationsAndroid />
    </MyView>
  );
}
