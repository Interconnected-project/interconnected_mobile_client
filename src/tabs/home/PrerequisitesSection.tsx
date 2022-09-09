import React from 'react';
import { View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';

import MyLegend from '../../common/MyLegend';
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

function checkWiFiConnected() {
  return new Promise<boolean>(function (resolve) {
    NetInfo.fetch().then((state) => {
      resolve(state.type === NetInfoStateType.wifi);
    });
  });
}

function checkIsConnectedToInternet() {
  return new Promise<boolean>(function (resolve) {
    NetInfo.fetch().then((state) => {
      resolve(state.isConnected ?? false);
    });
  });
}

export default function PrerequisitesSection() {
  return (
    <View style={styles.deviceStatusSection}>
      <MyLegend>Prerequisites:</MyLegend>
      <StatusField
        text={'Battery percentage above ' + BATTERY_PERCENTAGE_TRESHOLD + '%'}
        check={checkBatteryPercentageAboveTreshold}
      />
      <StatusField
        text={'Low power mode deactivated'}
        check={checkLowPowerModeDeactivated}
      />
      <StatusField text={'Connected to Wi-Fi'} check={checkWiFiConnected} />
      <StatusField
        text={'Internet connection available'}
        check={checkIsConnectedToInternet}
      />
    </View>
  );
}
