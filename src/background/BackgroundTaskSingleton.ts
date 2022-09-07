import BackgroundService from 'react-native-background-actions';
import notifee from '@notifee/react-native';

import { backgroundTask, backgroundTaskOptions } from './backgroundTask';

export default class BackgroundTaskSingleton {
  private static _instance: BackgroundTaskSingleton;

  private isStartedInThisRun: boolean;

  private constructor() {
    this.isStartedInThisRun = false;
  }

  public static get instance(): BackgroundTaskSingleton {
    if (this._instance === null || this._instance === undefined) {
      this._instance = new BackgroundTaskSingleton();
    }
    return this._instance;
  }

  public async start(): Promise<void> {
    let channelId: string;
    if (!this.isStartedInThisRun) {
      this.isStartedInThisRun = true;
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
            BackgroundService.start(
              backgroundTask(channelId),
              backgroundTaskOptions
            );
          });
      }
    }
  }
}
