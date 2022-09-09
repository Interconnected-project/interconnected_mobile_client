import React, { useEffect, useState } from 'react';
import { Switch } from 'react-native';
import BackgroundTaskSingleton from './background/BackgroundTaskSingleton';
import MyText from './common/MyText';

function toggleSwitch(setIsRunning: (isRunning: boolean) => any) {
  return async (newValue: boolean) => {
    if (newValue) {
      await BackgroundTaskSingleton.instance.start();
    } else {
      await BackgroundTaskSingleton.instance.stop();
    }
    setIsRunning(newValue);
  };
}

export default function BacgroundTaskSwitch() {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    BackgroundTaskSingleton.instance.isRunning().then((v) => setIsRunning(v));
  }, []);

  return (
    <>
      <MyText>
        Enable background task:
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isRunning ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch(setIsRunning)}
          value={isRunning}
        />
      </MyText>
    </>
  );
}
