import React from 'react';
import StepIndicator from 'react-native-step-indicator';

const gridStatusStyle = {
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
const labels = ['Not ready', 'Connecting', 'Online'];

export default function GridStatus() {
  return (
    <StepIndicator
      customStyles={gridStatusStyle}
      currentPosition={1}
      labels={labels}
      stepCount={labels.length}
    />
  );
}
