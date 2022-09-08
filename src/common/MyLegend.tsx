import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

interface MyLegendProps {
  children: React.ReactNode;
}

export default function MyLegend({ children }: MyLegendProps) {
  return <Text style={styles.legend}>{children}</Text>;
}
