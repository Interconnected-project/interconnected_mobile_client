import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import notifee from '@notifee/react-native';
import { BATTERY_TRESHOLD } from '../deviceStatus/BatteryStatus';

export const backgroundTaskOptions = {
  taskName: 'interconnected-background-task',
  taskTitle: 'Interconnected',
  taskDesc: 'App is running in background',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  parameters: {
    delay: 5000,
  },
};

const sleep = (time: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), time));

export function backgroundTask(channelId: string) {
  return async (taskDataArguments: any) => {
    const { delay } = taskDataArguments;
    while (true) {
      let wifiStatus = await new Promise<boolean>(function (resolve) {
        NetInfo.fetch().then((state) => {
          const isInternetReachable = state.isInternetReachable ?? false;
          resolve(state.type === NetInfoStateType.wifi && isInternetReachable);
        });
      });
      let batteryStatus = await DeviceInfo.getPowerState();
      let batteryLevel = batteryStatus.batteryLevel ?? 0;
      let isLowPowerMode = batteryStatus.lowPowerMode ?? false;
      let batteryStatusBoolean =
        batteryLevel >= BATTERY_TRESHOLD && !isLowPowerMode;
      let currentdate = new Date();
      await notifee.displayNotification({
        id: '123',
        title: 'Interconnected background task',
        body:
          currentdate.getHours() +
          ':' +
          currentdate.getMinutes() +
          ':' +
          currentdate.getSeconds() +
          ', Wi-Fi: ' +
          wifiStatus.toString() +
          ', Battery: ' +
          batteryStatusBoolean,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
        },
      });
      await sleep(delay);
    }
  };
}
