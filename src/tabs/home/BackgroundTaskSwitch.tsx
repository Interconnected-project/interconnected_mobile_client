import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import notifee from '@notifee/react-native';

import BackgroundTaskSingleton from '../../background/BackgroundTaskSingleton';
import MyText from '../../common/MyText';
import styles from '../../common/styles';

const toast = (msg: string) => {
  //ToastAndroid.show(msg, ToastAndroid.SHORT);
  console.log('TOAST: ' + msg);
};

notifee.createChannel({
  id: 'interconnected-background',
  name: 'Interconnected Background',
});

const notification = (msg: string) => {
  notifee.displayNotification({
    id: '123',
    title: 'Interconnected background task',
    body: msg,
    android: {
      channelId: 'interconnected-background',
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
};

async function toggleSwitch(
  setIsRunning: (isRunning: boolean) => any,
  currentValue: boolean
) {
  if (!currentValue) {
    await BackgroundTaskSingleton.instance.start(toast, notification);
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
