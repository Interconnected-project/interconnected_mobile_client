import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import { gridStatusStyle } from './common/styles';

const labels = ['Setup required', 'Connecting', 'Online'];

export default function GridStatus() {
  return (
    <StepIndicator
      customStyles={gridStatusStyle}
      currentPosition={2}
      labels={labels}
      stepCount={labels.length}
    />
  );
}
