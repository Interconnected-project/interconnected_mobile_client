import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';

import BackgroundTaskSingleton from '../../background/BackgroundTaskSingleton';
import MyText from '../../common/MyText';
import styles from '../../common/styles';

async function toggleSwitch(
  setIsRunning: (isRunning: boolean) => any,
  currentValue: boolean
) {
  if (!currentValue) {
    await BackgroundTaskSingleton.instance.start();
  } else {
    await BackgroundTaskSingleton.instance.stop();
  }
  setIsRunning(!currentValue);
}

export default function BacgroundTaskSwitch() {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    BackgroundTaskSingleton.instance.isRunning().then((v) => setIsRunning(v));
  }, []);

  return (
    <View style={[styles.backgroundTaskSwitchSection]}>
      <MyText>Enable Grid contribution:</MyText>
      <SwitchToggle
        switchOn={isRunning}
        onPress={() => toggleSwitch(setIsRunning, isRunning)}
        circleColorOff='#e84744'
        circleColorOn='#67a140'
        backgroundColorOn='#6D6D6D'
        backgroundColorOff='#6D6D6D'
        containerStyle={styles.backgroundSwitchContainer}
        circleStyle={styles.backgroundSwitchCircle}
      />
    </View>
  );
}
