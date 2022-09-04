import React from 'react';
import { Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface MyTitleProps {
  children: React.ReactNode;
}

const myTitleStyle = StyleSheet.create({
  style: {
    fontSize: 24,
    fontWeight: '600',
  },
});

const MyTitle = ({ children }: MyTitleProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Text
      style={[
        myTitleStyle.style,
        { color: isDarkMode ? Colors.white : Colors.black },
      ]}
    >
      {children}
    </Text>
  );
};

export default MyTitle;
