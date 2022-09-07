import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  app: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: '100%',
    justifyContent: 'space-evenly',
    backgroundColor: '#0D1A2D',
  },
  logoSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '80%',
    height: undefined,
    aspectRatio: 1 / 1,
  },
  deviceStatusSection: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FAB505',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 13,
  },
});

export default styles;
