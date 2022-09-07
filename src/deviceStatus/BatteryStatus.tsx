import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import MyText from '../common/MyText';

export const BATTERY_TRESHOLD = 0.2;

function status(
  isLoading: boolean,
  batteryLevel: number,
  isLowPowerMode: boolean
) {
  if (isLoading) {
    return <ActivityIndicator />;
  } else if (batteryLevel >= BATTERY_TRESHOLD && !isLowPowerMode) {
    return <>🟢</>;
  } else {
    return <>🔴</>;
  }
}

async function checkBatteryStatus(
  setIsLoading: (v: React.SetStateAction<boolean>) => void,
  setBatteryLevel: (v: React.SetStateAction<number>) => void,
  setIsLowPowerMode: (v: React.SetStateAction<boolean>) => void
): Promise<void> {
  await DeviceInfo.getPowerState().then((state) => {
    setBatteryLevel(state.batteryLevel ?? 0);
    setIsLowPowerMode(state.lowPowerMode ?? false);
    setIsLoading(false);
  });
}

export default function BatteryStatus() {
  const [isLoading, setIsLoading] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  useEffect(() => {
    checkBatteryStatus(setIsLoading, setBatteryLevel, setIsLowPowerMode);
    const interval = setInterval(() => {
      checkBatteryStatus(setIsLoading, setBatteryLevel, setIsLowPowerMode);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MyText>
      {status(isLoading, batteryLevel, isLowPowerMode)} Battery status
    </MyText>
  );
}
