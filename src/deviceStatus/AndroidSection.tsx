import React, { useState } from 'react';
import { Button, Modal, NativeModules, View } from 'react-native';

import MyLegend from '../common/MyLegend';
import MyView from '../common/MyView';
import StatusField from '../common/StatusField';
import styles from '../common/styles';
const { BatteryOptimizationModule } = NativeModules;

export default function AndroidSection() {
  const [isModalVisible, setModalVisible] = useState(false);

  function checkIsBatteryOptimizationDisabled() {
    return new Promise<boolean>(function (resolve) {
      BatteryOptimizationModule.isBatteryOptimizationCurrentlyActive().then(
        (isActive: any) => {
          let isActiveTypeSafe =
            typeof isActive === 'boolean' ? isActive : true;
          setModalVisible(isActiveTypeSafe);
          resolve(!isActiveTypeSafe);
        }
      );
    });
  }

  return (
    <View style={styles.deviceStatusSection}>
      <MyLegend>Android:</MyLegend>
      <StatusField
        text={'Battery optimization disabled'}
        check={checkIsBatteryOptimizationDisabled}
      />
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
    </View>
  );
}
