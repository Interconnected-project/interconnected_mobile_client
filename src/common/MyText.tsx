import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

interface MyTextProps {
  children: React.ReactNode;
}

const MyText = ({ children }: MyTextProps) => {
  return <Text style={[styles.text]}>{children}</Text>;
};

export default MyText;
