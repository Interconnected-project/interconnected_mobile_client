import BackgroundService from 'react-native-background-actions';

const sleep = (time: any) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), time));

const backgroundTask = async (taskDataArguments: any) => {
  // Example of an infinite loop task
  const { delay } = taskDataArguments;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  await new Promise(async (resolve) => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log(i);
      await sleep(delay);
    }
  });
};

const options = {
  taskName: 'interconnected-background-task',
  taskTitle: 'Interconnected',
  taskDesc: 'App is running in background',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  parameters: {
    delay: 10000,
  },
};

export default async function startBackgroundService() {
  BackgroundService.start(backgroundTask, options);
}
