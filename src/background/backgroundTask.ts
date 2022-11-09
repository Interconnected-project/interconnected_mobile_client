import BackgroundService from 'react-native-background-actions';
import BackgroundTaskSingleton from './BackgroundTaskSingleton';

const sleep = (time: any) =>
  new Promise((resolve) => setTimeout(() => resolve(undefined), time));

export async function backgroundTask(taskDataArguments: any) {
  const { delay } = taskDataArguments;
  await new Promise(async () => {
    while (BackgroundService.isRunning()) {
      const arePrerequisitesMet =
        await BackgroundTaskSingleton.instance.prerequisitesMet();
      if (arePrerequisitesMet) {
        BackgroundTaskSingleton.instance.startNode();
      } else {
        BackgroundTaskSingleton.instance.stopNode();
      }
      await sleep(delay);
    }
  });
}
