import React, { useEffect, useState } from 'react';
import StepIndicator from 'react-native-step-indicator';
import BackgroundTaskSingleton from '../../background/BackgroundTaskSingleton';
import BackgroundTaskStatus from '../../background/BackgroundTaskStatus';

const enabledGridStatusStyle = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 4,
  currentStepStrokeWidth: 4,
  stepStrokeCurrentColor: '#c80a50',
  stepStrokeWidth: 4,
  stepStrokeFinishedColor: '#c80a50',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fab400',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#f0f0f0',
  stepIndicatorUnFinishedColor: '#f0f0f0',
  stepIndicatorCurrentColor: '#f0f0f0',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#f0f0f0',
  stepIndicatorLabelFinishedColor: '#f0f0f0',
  stepIndicatorLabelUnFinishedColor: '#f0f0f0',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#c80a50',
};

const disabledGridStatusStyle = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 4,
  currentStepStrokeWidth: 4,
  stepStrokeCurrentColor: '#aaaaaa',
  stepStrokeWidth: 4,
  stepStrokeFinishedColor: '#aaaaaa',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#aaaaaa',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#f0f0f0',
  stepIndicatorUnFinishedColor: '#f0f0f0',
  stepIndicatorCurrentColor: '#f0f0f0',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#f0f0f0',
  stepIndicatorLabelFinishedColor: '#f0f0f0',
  stepIndicatorLabelUnFinishedColor: '#f0f0f0',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#999999',
};

const labels = ['Not ready', 'Connecting', 'Online'];
const REFRESH_PERIOD_MS = 500;
const background = BackgroundTaskSingleton.instance;

export default function GridStatus() {
  const [style, setStyle] = useState(disabledGridStatusStyle);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      background.status().then((status) => {
        if (status === BackgroundTaskStatus.OFF) {
          setStyle(disabledGridStatusStyle);
          setPosition(0);
        } else if (status === BackgroundTaskStatus.PREREQUISITES_NOT_MET) {
          setStyle(enabledGridStatusStyle);
          setPosition(0);
        } else if (status === BackgroundTaskStatus.CONNECTING) {
          setStyle(enabledGridStatusStyle);
          setPosition(1);
        } else if (status === BackgroundTaskStatus.CONNECTED) {
          setStyle(enabledGridStatusStyle);
          setPosition(2);
        }
      });
    }, REFRESH_PERIOD_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <StepIndicator
      customStyles={style}
      currentPosition={position}
      labels={labels}
      stepCount={labels.length}
    />
  );
}
