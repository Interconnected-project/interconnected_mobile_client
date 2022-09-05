import BackgroundService from 'react-native-background-actions';
import notifee from '@notifee/react-native';

let channelId: string;

const options = {
  taskName: 'interconnected-background-task',
  taskTitle: 'Interconnected',
  taskDesc: 'App is running in background',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  parameters: {
    delay: 60000,
  },
};

const sleep = (time: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), time));

const backgroundTask = async (taskDataArguments: any) => {
  const { delay } = taskDataArguments;
  for (let i = 0; BackgroundService.isRunning(); i++) {
    console.log(i);
    await notifee.displayNotification({
      id: '123',
      title: 'Interconnected background task',
      body: 'counter: ' + i.toString(),
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

export default async function startBackgroundService() {
  if (!BackgroundService.isRunning()) {
    notifee
      .createChannel({
        id: 'default-id',
        name: 'Default Channel',
      })
      .then((id) => {
        channelId = id;
      })
      .then(() => {
        notifee.displayNotification({
          id: '123',
          title: 'Interconnected background',
          body: 'Start',
          android: {
            channelId,
            smallIcon: 'ic_launcher',
            pressAction: {
              id: 'default',
            },
          },
        });
      })
      .then(() => {
        BackgroundService.start(backgroundTask, options);
      });
  }
}
