import React, { useState } from 'react';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';

import MyText from '../common/MyText';
import { ActivityIndicator } from 'react-native';

function status(
  isLoading: boolean,
  type: NetInfoStateType,
  isConnected: boolean
) {
  if (isLoading) {
    return <ActivityIndicator />;
  } else if (type === NetInfoStateType.wifi && isConnected) {
    return <>✔</>;
  } else {
    return <>❌</>;
  }
}

export default function WiFiConnection() {
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState(NetInfoStateType.unknown);
  const [isConnected, setIsConnected] = useState(false);

  NetInfo.addEventListener((state) => {
    if (state.type !== type) {
      setType(state.type);
    }
    if ((state.isConnected ?? false) !== isConnected) {
      setIsConnected(state.isConnected ?? false);
    }
    if (isLoading) {
      setIsLoading(false);
    }
  });

  return <MyText>{status(isLoading, type, isConnected)} Wi-Fi status</MyText>;
}
