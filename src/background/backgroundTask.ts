import BackgroundTaskSingleton from './BackgroundTaskSingleton';

export function backgroundTask() {
  return async () => {
    const arePrerequisitesMet =
      await BackgroundTaskSingleton.instance.prerequisitesMet();
    if (arePrerequisitesMet) {
      BackgroundTaskSingleton.instance.startNode();
    } else {
      BackgroundTaskSingleton.instance.stopNode();
    }
  };
}
