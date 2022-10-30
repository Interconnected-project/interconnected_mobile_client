import MasterP2PConnection from 'interconnected_node/dist/interconnected_node/masters_hub/MasterP2PConnection';
import {
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';

class ReactNativeMasterP2PConnection implements MasterP2PConnection {
  private _peer: RTCPeerConnection;

  private _operationId: string;

  private _masterId: string;

  private _masterRole: string;

  private _emitIceCandidate: (payload: any) => void;

  constructor(
    peer: RTCPeerConnection,
    private myId: string,
    operationId: string,
    masterId: string,
    masterRole: string,
    emitIceCandidate: (payload: any) => void
  ) {
    this._peer = peer;
    this._operationId = operationId;
    this._masterId = masterId;
    this._masterRole = masterRole;
    this._emitIceCandidate = emitIceCandidate;

    this._peer.addEventListener('icecandidate', (e: any) => {
      if (e.candidate) {
        const interval = setInterval(() => {
          if (
            this._peer.remoteDescription !== null &&
            this._peer.localDescription !== null
          ) {
            const icePayload = {
              fromId: this.myId,
              senderRole: 'NODE',
              toId: this._masterId,
              receiverRole: this._masterRole,
              candidate: e.candidate,
            };
            this._emitIceCandidate(icePayload);
            clearInterval(interval);
          }
        }, 200);
      }
    });
  }

  get operationId(): string {
    return this._operationId;
  }

  get masterId(): string {
    return this._masterId;
  }

  get masterRole(): string {
    return this._masterRole;
  }

  get answer(): any {
    return this._peer.localDescription;
  }

  setIceCandidate(candidate: any): void {
    const interval = setInterval(() => {
      if (
        this._peer.remoteDescription !== null &&
        this._peer.localDescription !== null
      ) {
        this._peer
          .addIceCandidate(new RTCIceCandidate(candidate))
          .catch((e) => console.log(e));
        clearInterval(interval);
      }
    }, 200);
  }

  disconnect(): void {
    this._peer.close();
  }
}

export default function onIncomingConnectionHandler(
  notification: (msg: string) => void,
  myId: string
): (
  payload: any,
  emitIceCandidateCallback: (payload: any) => void,
  disconnectionCallback: () => void
) => Promise<MasterP2PConnection> {
  return async function (
    payload: any,
    emitIceCandidateCallback: (payload: any) => void,
    disconnectionCallback: () => void
  ): Promise<MasterP2PConnection> {
    const peer: RTCPeerConnection = new RTCPeerConnection({
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

    await peer.setRemoteDescription(new RTCSessionDescription(payload.sdp));
    const answer: any = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const p2pConnection = new ReactNativeMasterP2PConnection(
      peer,
      myId,
      payload.operationId,
      payload.masterId,
      payload.masterRole,
      emitIceCandidateCallback
    );

    peer.addEventListener('connectionstatechange', () => {
      if (peer.connectionState === 'failed') {
        disconnectionCallback();
      }
    });

    peer.addEventListener('datachannel', (event: any) => {
      const testChannel = event.channel;
      testChannel.onmessage = (e: { data: string }) => {
        let value = parseInt(e.data, 10);
        notification('received ' + value++);
        if (
          peer.connectionState.toString() !== 'disconnected' &&
          peer.connectionState.toString() !== 'failed' &&
          peer.connectionState.toString() !== 'closed'
        ) {
          testChannel.send(value.toString());
        }
      };
    });

    return new Promise<MasterP2PConnection>((complete) => {
      complete(p2pConnection);
    });
  };
}
