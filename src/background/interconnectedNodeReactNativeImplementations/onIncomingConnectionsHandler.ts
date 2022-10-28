import {
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';
import AnswererP2PConnection from 'interconnected_node/dist/AnswererP2PConnection';

class ReactNativeAnswererP2PConnection implements AnswererP2PConnection {
  private _peer: RTCPeerConnection;

  private _myId: string;

  private _initiatorId: string;

  private _initiatorRole: string;

  private _emitIceCandidate: (payload: any) => void;

  constructor(
    peer: RTCPeerConnection,
    myId: string,
    initiatorId: string,
    initiatorRole: string,
    emitIceCandidate: (payload: any) => void
  ) {
    this._peer = peer;
    this._myId = myId;
    this._initiatorId = initiatorId;
    this._initiatorRole = initiatorRole;
    this._emitIceCandidate = emitIceCandidate;

    this._peer.addEventListener('icecandidate', (e: any) => {
      if (e.candidate) {
        const interval = setInterval(() => {
          if (
            this._peer.remoteDescription !== null &&
            this._peer.localDescription !== null
          ) {
            const icePayload = {
              fromId: this._myId,
              senderRole: 'NODE',
              toId: this._initiatorId,
              receiverRole: this._initiatorRole,
              candidate: e.candidate,
            };
            this._emitIceCandidate(icePayload);
            clearInterval(interval);
          }
        }, 200);
      }
    });
  }

  get myId(): string {
    return this._myId;
  }

  get initiatorId(): string {
    return this._initiatorId;
  }

  get initiatorRole(): string {
    return this._initiatorRole;
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
  notification: (msg: string) => void
): (
  payload: any,
  emitIceCandidateCallback: (payload: any) => void,
  disconnectionCallback: () => void
) => Promise<AnswererP2PConnection> {
  return async function (
    payload: any,
    emitIceCandidateCallback: (payload: any) => void,
    disconnectionCallback: () => void
  ): Promise<AnswererP2PConnection> {
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
    const p2pConnection = new ReactNativeAnswererP2PConnection(
      peer,
      payload.answererId,
      payload.initiatorId,
      payload.initiatorRole,
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

    return new Promise<AnswererP2PConnection>((complete) => {
      complete(p2pConnection);
    });
  };
}
