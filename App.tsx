import React from 'react';

import MyStatusBar from './src/common/MyStatusBar';
import MyView from './src/common/MyView';
import BatteryOptimizationsAndroid from './src/batteryOptimization/BatteryOptimizationsAndroid';

export default function App() {
  return (
    <MyView>
      <MyStatusBar />
      <BatteryOptimizationsAndroid />
    </MyView>
  );
}
