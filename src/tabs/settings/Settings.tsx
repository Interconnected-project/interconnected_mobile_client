import React from 'react';
import { View } from 'react-native';
import styles from '../../common/styles';
import AndroidSection from './AndroidSection';

export default function Settings() {
  return (
    <View style={styles.app}>
      <AndroidSection />
    </View>
  );
}