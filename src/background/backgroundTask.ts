import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import notifee from '@notifee/react-native';
import { BATTERY_PERCENTAGE_TRESHOLD } from '../tabs/home/PrerequisitesSection';

async function updateNotification(
  wifiStatus: boolean,
  batteryStatus: boolean,
  channelId: string
) {
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
      wifiStatus +
      ', Battery: ' +
      batteryStatus,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
}

export function backgroundTask() {
  return async () => {
    await notifee.createChannel({
      id: 'default-id',
      name: 'Default Channel',
    });
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
      batteryLevel >= BATTERY_PERCENTAGE_TRESHOLD / 100 && !isLowPowerMode;
    await updateNotification(wifiStatus, batteryStatusBoolean, 'default-id');
  };
}
