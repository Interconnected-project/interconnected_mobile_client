import DeviceInfo from 'react-native-device-info';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';

import Heartbeat from './Heartbeat';
import BackgroundTaskStatus from './BackgroundTaskStatus';
import { BATTERY_PERCENTAGE_TRESHOLD } from '../tabs/home/PrerequisitesSection';
import InterconnectedNode, { DeviceType } from 'interconnected_node';
import { ToastAndroid } from 'react-native';
import MobileP2PConnectionBuilders from './mobileSpecificNodeImplementation/MobileP2PConnectionBuilders';

const BROKER_SERVICE_ADDRESS =
  'http://ec2-3-208-18-248.compute-1.amazonaws.com:8000';

export default class BackgroundTaskSingleton {
  private static _instance: BackgroundTaskSingleton;

  private node: InterconnectedNode;

  private constructor() {
    const myId = DeviceInfo.getUniqueIdSync();
    ToastAndroid.show('My id: ' + myId, ToastAndroid.SHORT);
    this.node = new InterconnectedNode(
      myId,
      new MobileP2PConnectionBuilders(),
      DeviceType.MOBILE
    );
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

  public async start(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.isRunning().then(async (v) => {
        if (!v) {
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
          await this.stopNode();
          await Heartbeat.stopService();
        }
        resolve();
      });
    });
  }

  public async startNode(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.isRunning().then((backgroundTaskIsRunning) => {
        if (backgroundTaskIsRunning) {
          this.node.isRunning().then(async (nodeIsRunning) => {
            if (!nodeIsRunning) {
              this.node.start(BROKER_SERVICE_ADDRESS);
            }
            resolve();
          });
        } else {
          resolve();
        }
      });
    });
  }

  public async stopNode(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.isRunning().then((backgroundTaskIsRunning) => {
        if (backgroundTaskIsRunning) {
          this.node.isRunning().then(async (nodeIsRunning) => {
            if (nodeIsRunning) {
              this.node.stop();
            }
            resolve();
          });
        } else {
          resolve();
        }
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

  public async prerequisitesMet(): Promise<boolean> {
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
}
