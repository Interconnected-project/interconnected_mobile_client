import React from 'react';
import { Button, NativeModules, View } from 'react-native';

import MyLegend from '../../common/MyLegend';
import styles from '../../common/styles';
const { Autostart } = NativeModules;

export default function AndroidAutostart() {
  return (
    <View style={styles.settingsSection}>
      <MyLegend>Android autostart:</MyLegend>
      <Button
        title='Enable autostart'
        onPress={() => {
          Autostart.startAutostartSettings();
        }}
      />
    </View>
  );
}
