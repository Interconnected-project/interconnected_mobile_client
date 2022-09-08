import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  app: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: '100%',
    justifyContent: 'space-evenly',
    backgroundColor: '#1e1f21',
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
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#121212',
  },
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontWeight: 'bold',
    color: '#DACFBA',
  },
  text: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#DACFBA',
  },
});

export default styles;
