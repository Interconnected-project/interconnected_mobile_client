import { MasterP2PConnection } from 'interconnected_node';
import {
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';

export default class MobileMasterP2PConnection implements MasterP2PConnection {
  private _slaveId: string;

  private _operationId: string;

  private peer: RTCPeerConnection;

  private dataChannel: any;

  constructor(
    slaveId: string,
    operationId: string,
    onIceCandidateHandler: (candidate: any) => void,
    onMessageHandler: (msg: any) => void,
    onDisconnectionHandler: () => void
  ) {
    this._slaveId = slaveId;
    this._operationId = operationId;
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:openrelay.metered.ca:80',
        },
        {
          urls: 'turn:openrelay.metered.ca:80',
          username: 'openrelayproject',
          credential: 'openrelayproject',
        },
        {
          urls: 'turn:openrelay.metered.ca:443',
          username: 'openrelayproject',
          credential: 'openrelayproject',
        },
        {
          urls: 'turn:openrelay.metered.ca:443?transport=tcp',
          username: 'openrelayproject',
          credential: 'openrelayproject',
        },
      ],
    });

    this.peer.addEventListener('icecandidate', (e: any) => {
      if (e.candidate) {
        if (
          this.peer.localDescription !== undefined &&
          this.peer.remoteDescription !== undefined
        ) {
          onIceCandidateHandler(e.candidate);
        } else {
          const interval = setInterval(() => {
            if (
              this.peer.localDescription !== undefined &&
              this.peer.remoteDescription !== undefined
            ) {
              clearInterval(interval);
              onIceCandidateHandler(e.candidate);
            }
          }, 100);
        }
      }
    });

    this.peer.addEventListener('connectionstatechange', () => {
      if (this.peer.connectionState === 'failed') {
        onDisconnectionHandler();
      }
    });

    this.dataChannel = this.peer.createDataChannel('');
    this.dataChannel.addEventListener('message', (e: any) => {
      onMessageHandler(e.data);
    });
  }

  get slaveId(): string {
    return this._slaveId;
  }

  get operationId(): string {
    return this._operationId;
  }

  createOffer(): Promise<any> {
    return new Promise<any>((complete) => {
      this.peer.createOffer({}).then((offer: any) => complete(offer));
    });
  }

  setLocalDescription(sdp: any): Promise<void> {
    return new Promise<void>((complete) => {
      this.peer.setLocalDescription(sdp).then(() => complete());
    });
  }

  get localDescription(): any {
    return this.peer.localDescription;
  }

  setRemoteDescription(sdp: any): Promise<void> {
    return new Promise<void>((complete) => {
      this.peer
        .setRemoteDescription(new RTCSessionDescription(sdp))
        .then(() => complete());
    });
  }

  get remoteDescription(): any {
    return this.peer.remoteDescription;
  }

  addIceCandidate(candidate: any): Promise<void> {
    return new Promise<void>((complete) => {
      if (
        this.peer.localDescription !== undefined &&
        this.peer.remoteDescription !== undefined
      ) {
        this.peer
          .addIceCandidate(new RTCIceCandidate(candidate))
          .then(() => complete());
      } else {
        const interval = setInterval(() => {
          if (
            this.peer.localDescription !== undefined &&
            this.peer.remoteDescription !== undefined
          ) {
            clearInterval(interval);
            this.peer
              .addIceCandidate(new RTCIceCandidate(candidate))
              .then(() => complete());
          }
        }, 100);
      }
    });
  }

  sendMessage(msg: any): void {
    if (
      this.dataChannel !== undefined &&
      this.dataChannel.readyState === 'open'
    ) {
      this.dataChannel.send(msg);
    } else {
      const interval = setInterval(() => {
        if (
          this.dataChannel !== undefined &&
          this.dataChannel.readyState === 'open'
        ) {
          this.dataChannel.send(msg);
          clearInterval(interval);
        }
      }, 100);
    }
  }

  close(): void {
    this.peer.close();
  }
}
