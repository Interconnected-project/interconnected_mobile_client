import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#1e1f21',
  },
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
    width: '75%',
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
  settingsSection: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#121212',
  },
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontWeight: 'bold',
    color: '#fab400',
  },
  text: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#DACFBA',
  },
  backgroundTaskSwitchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  backgroundSwitchContainer: {
    marginTop: 14,
    width: 50,
    height: 16,
    borderRadius: 15,
    padding: 0,
  },
  backgroundSwitchCircle: {
    width: 28,
    height: 22,
    borderRadius: 15,
  },
});

export default styles;
