import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';

import { InterconnectedNodeBuilder } from 'interconnected_node';
import InterconnectedNode from 'interconnected_node/dist/interconnected_node/InterconnectedNode';
import Heartbeat from './Heartbeat';
import onIncomingConnectionHandler from './interconnectedNodeReactNativeImplementations/onIncomingConnectionsHandler';
import BackgroundTaskStatus from './BackgroundTaskStatus';
import { BATTERY_PERCENTAGE_TRESHOLD } from '../tabs/home/PrerequisitesSection';

const BROKER_SERVICE_ADDRESS =
  'http://ec2-3-208-18-248.compute-1.amazonaws.com:8000';

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
          this.node.start(
            BROKER_SERVICE_ADDRESS,
            id,
            toast,
            onIncomingConnectionHandler(notification)
          );
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

  public async status(): Promise<string> {
    return new Promise<string>(function (resolve) {
      BackgroundTaskSingleton._instance.isRunning().then((running) => {
        if (!running) {
          resolve(BackgroundTaskStatus.OFF);
        } else {
          BackgroundTaskSingleton._instance
            .prerequisitesMet()
            .then((prerequisites) => {
              if (!prerequisites) {
                resolve(BackgroundTaskStatus.PREREQUISITES_NOT_MET);
              } else {
                BackgroundTaskSingleton._instance.node
                  .isConnectedToGrid()
                  .then((isConnected) => {
                    if (!isConnected) {
                      resolve(BackgroundTaskStatus.CONNECTING);
                    } else {
                      resolve(BackgroundTaskStatus.CONNECTED);
                    }
                  });
              }
            });
        }
      });
    });
  }

  private async prerequisitesMet(): Promise<boolean> {
    return new Promise<boolean>(function (resolve) {
      DeviceInfo.getPowerState().then((battery) => {
        if (
          battery.batteryLevel === undefined ||
          battery.batteryLevel * 100 < BATTERY_PERCENTAGE_TRESHOLD ||
          battery.lowPowerMode === true
        ) {
          resolve(false);
        } else {
          NetInfo.fetch().then((net) => {
            resolve(
              net.type === NetInfoStateType.wifi && (net.isConnected ?? false)
            );
          });
        }
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
