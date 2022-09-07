import React from 'react';
import { Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface MyTextProps {
  children: React.ReactNode;
}

const myTextStyle = StyleSheet.create({
  style: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#DACFBA',
  },
});

const MyText = ({ children }: MyTextProps) => {
  return <Text style={[myTextStyle.style]}>{children}</Text>;
};

export default MyText;
