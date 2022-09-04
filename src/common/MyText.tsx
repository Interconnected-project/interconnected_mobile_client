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
  },
});

const MyText = ({ children }: MyTextProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Text
      style={[
        myTextStyle.style,
        { color: isDarkMode ? Colors.light : Colors.dark },
      ]}
    >
      {children}
    </Text>
  );
};

export default MyText;
