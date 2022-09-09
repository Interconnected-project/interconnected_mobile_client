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
    width: '50%',
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

export const gridStatusStyle = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 4,
  currentStepStrokeWidth: 4,
  stepStrokeCurrentColor: '#c80a50',
  stepStrokeWidth: 4,
  stepStrokeFinishedColor: '#c80a50',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fab400',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#f0f0f0',
  stepIndicatorUnFinishedColor: '#f0f0f0',
  stepIndicatorCurrentColor: '#f0f0f0',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#f0f0f0',
  stepIndicatorLabelFinishedColor: '#f0f0f0',
  stepIndicatorLabelUnFinishedColor: '#f0f0f0',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#c80a50',
};

export default styles;
