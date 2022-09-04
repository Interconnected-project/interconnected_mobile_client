import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface MyViewProps {
  children: React.ReactNode;
}

const myViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MyView = ({ children }: MyViewProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        myViewStyle.container,
        { backgroundColor: isDarkMode ? Colors.black : Colors.white },
      ]}
    >
      {children}
    </View>
  );
};

export default MyView;
