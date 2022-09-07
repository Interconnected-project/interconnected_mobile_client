import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  AppState,
  AppStateStatus,
  Button,
  Modal,
  NativeModules,
} from 'react-native';
import MyText from '../common/MyText';
import MyView from '../common/MyView';
const { BatteryOptimizationModule } = NativeModules;

function status(isLoading: boolean, isBatteryOptimizationActive: boolean) {
  if (isLoading) {
    return <ActivityIndicator />;
  } else if (isBatteryOptimizationActive) {
    return <>❌</>;
  } else {
    return <>✔</>;
  }
}

function batteryOptimizationListener(
  setIsLoading: (v: React.SetStateAction<boolean>) => void,
  setIsBatteryOptimizationActive: (v: React.SetStateAction<boolean>) => void,
  setIsModalVisible: (v: React.SetStateAction<boolean>) => void
) {
  return (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      BatteryOptimizationModule.isBatteryOptimizationCurrentlyActive().then(
        (isActive: any) => {
          setIsBatteryOptimizationActive(isActive);
          setIsLoading(false);
          setIsModalVisible(isActive);
        }
      );
    }
  };
}

export default function BatteryOptimizationsAndroid() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBatteryOptimizationActive, setIsBatteryOptimizationActive] =
    useState(false);

  useEffect(() => {
    AppState.addEventListener(
      'change',
      batteryOptimizationListener(
        setIsLoading,
        setIsBatteryOptimizationActive,
        setIsModalVisible
      )
    );
  }, []);

  return (
    <>
      <MyText>
        {status(isLoading, isBatteryOptimizationActive)} Battery optimization
        disabled
      </MyText>
      <Modal visible={isModalVisible}>
        <MyView>
          <Button
            title='Disable battery optimization'
            onPress={() => {
              BatteryOptimizationModule.openBatteryOptimizationSettings();
            }}
          />
        </MyView>
      </Modal>
    </>
  );
}
