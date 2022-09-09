import React from 'react';
import { View } from 'react-native';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';

import MyLegend from '../../common/MyLegend';
import StatusField from '../../common/StatusField';
import styles from '../../common/styles';

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

export default function ConnectivitySection() {
  return (
    <View style={styles.deviceStatusSection}>
      <MyLegend>Connectivity:</MyLegend>
      <StatusField text={'Wi-Fi connected'} check={checkWiFiConnected} />
      <StatusField
        text={'Internet connection available'}
        check={checkIsConnectedToInternet}
      />
    </View>
  );
}
