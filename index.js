/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App.tsx';
import { name as appName } from './app.json';
import { backgroundTask } from './src/background/backgroundTask';

AppRegistry.registerHeadlessTask('Heartbeat', () => backgroundTask());
AppRegistry.registerComponent(appName, () => App);
