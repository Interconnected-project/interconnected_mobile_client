import React from 'react';
import { Image, View } from 'react-native';
import styles from './common/styles';

const logoImage = require('../assets/logo.png');

export default function LogoSection() {
  return (
    <View style={styles.logoSection}>
      <Image source={logoImage} style={styles.logoImage} />
    </View>
  );
}
