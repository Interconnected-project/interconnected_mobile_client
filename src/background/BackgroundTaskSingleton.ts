import { getUniqueId } from 'react-native-device-info';

import { InterconnectedNodeBuilder } from 'interconnected_node';
import InterconnectedNode from 'interconnected_node/dist/interconnected_node/InterconnectedNode';
import Heartbeat from './Heartbeat';
import {
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';
export default class BackgroundTaskSingleton {
  private static _instance: BackgroundTaskSingleton;

  private node: InterconnectedNode;

  private peer: RTCPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.stunprotocol.org',
      },
      {
        urls: 'turn:numb.viagenie.ca',
        credential: 'muazkh',
        username: 'webrtc@live.com',
      },
    ],
  });

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
            id,
            toast,
            this.onIncomingConnectionHandler(
              this.peer,
              this.node,
              notification
            ),
            this.onIceCandidateReceivedHandler(this.peer)
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

  private onIncomingConnectionHandler(
    peer: RTCPeerConnection,
    node: InterconnectedNode,
    notification: (msg: string) => void
  ): (payload: any) => Promise<any> {
    return async function (payload: any): Promise<any> {
      peer.addEventListener('datachannel', (event: any) => {
        const testChannel = event.channel;
        testChannel.onmessage = (e: { data: string }) => {
          let value = parseInt(e.data, 10);
          notification('received ' + value++);
          testChannel.send(value.toString());
        };
      });
      peer.addEventListener('icecandidate', (e: any) => {
        if (e.candidate) {
          const icePayload = {
            fromId: payload.answererId,
            senderRole: 'NODE',
            toId: payload.initiatorId,
            receiverRole: payload.initiatorRole,
            candidate: e.candidate,
          };
          node.emitIceCandidate(icePayload);
        }
      });
      const desc = new RTCSessionDescription(payload.sdp);
      await peer.setRemoteDescription(desc);
      const answer: any = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      return new Promise<any>((resolve) => {
        payload.sdp = peer.localDescription;
        resolve(payload);
      });
    };
  }

  private onIceCandidateReceivedHandler(
    peer: RTCPeerConnection
  ): (payload: any) => void {
    return function (payload: any): void {
      if (payload.candidate !== undefined) {
        const candidate = new RTCIceCandidate(payload.candidate);
        peer.addIceCandidate(candidate).catch((e: any) => console.log(e));
      }
    };
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
