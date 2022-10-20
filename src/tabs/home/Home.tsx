import React from 'react';
import { View } from 'react-native';

import styles from '../../common/styles';
import BacgroundTaskSwitch from './BackgroundTaskSwitch';
import PrerequisitesSection from './PrerequisitesSection';
import GridStatus from './GridStatus';
import LogoSection from './LogoSection';

export default function Home() {
  return (
    <View style={styles.app}>
      <LogoSection />
      <GridStatus />
      <BacgroundTaskSwitch />
      <PrerequisitesSection />
    </View>
  );
}
