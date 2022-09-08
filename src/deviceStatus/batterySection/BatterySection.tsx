import React from 'react';
import { View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import MyLegend from '../../common/MyLegend';
import MyText from '../../common/MyText';

import StatusField from '../../common/StatusField';
import styles from '../../common/styles';

export const BATTERY_PERCENTAGE_TRESHOLD = 20;

function checkBatteryPercentageAboveTreshold() {
  return new Promise<boolean>(function (resolve) {
    DeviceInfo.getPowerState().then((state) => {
      if (state.batteryLevel === undefined) {
        resolve(false);
      } else {
        resolve(state.batteryLevel * 100 >= BATTERY_PERCENTAGE_TRESHOLD);
      }
    });
  });
}

function checkLowPowerModeDeactivated() {
  return new Promise<boolean>(function (resolve) {
    DeviceInfo.getPowerState().then((state) => {
      if (state.lowPowerMode === undefined) {
        resolve(true);
      } else {
        resolve(!state.lowPowerMode);
      }
    });
  });
}

export default function BatterySection() {
  return (
    <View style={styles.deviceStatusSection}>
      <MyLegend>Battery:</MyLegend>
      <StatusField
        text={'Battery percentage above ' + BATTERY_PERCENTAGE_TRESHOLD + '%'}
        check={checkBatteryPercentageAboveTreshold}
      />
      <StatusField
        text={'Low power mode deactivated '}
        check={checkLowPowerModeDeactivated}
      />
    </View>
  );
}
