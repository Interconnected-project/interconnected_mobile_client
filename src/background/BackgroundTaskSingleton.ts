import { getUniqueId } from 'react-native-device-info';
import { InterconnectedNodeBuilder } from 'interconnected_node';
import InterconnectedNode from 'interconnected_node/dist/interconnected_node/InterconnectedNode';

import Heartbeat from './Heartbeat';

export default class BackgroundTaskSingleton {
  private static _instance: BackgroundTaskSingleton;

  private node: InterconnectedNode;

  private constructor() {
    this.node = new InterconnectedNodeBuilder().build();
  }

  public static get instance(): BackgroundTaskSingleton {
    if (this._instance === null || this._instance === undefined) {
      this._instance = new BackgroundTaskSingleton();
    }
    return this._instance;
  }

  public async isRunning(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      Heartbeat.isServiceRunning().then((res: boolean) => {
        resolve(res);
      });
    });
  }

  public async start(
    toast: (msg: string) => void,
    notification: (msg: string) => void
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.isRunning().then(async (v) => {
        if (!v) {
          const id = await getUniqueId();
          toast('my id:\n' + id);
          this.node.start(id, toast, notification);
          await Heartbeat.startService();
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  public async stop(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.isRunning().then(async (v) => {
        if (v) {
          this.node.stop();
          await Heartbeat.stopService();
        }
        resolve();
      });
    });
  }

  /*public async start(): Promise<void> {
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
  }*/
}
