import {
  MasterP2PConnection,
  MasterP2PConnectionBuilder,
} from 'interconnected_node';
import MobileMasterP2PConnection from './MobileMasterP2PConnection';

export default class MobileMasterP2PConenctionBuilder
  implements MasterP2PConnectionBuilder
{
  private _slaveId: string | undefined;

  private _operationId: string | undefined;

  private _onIceCandidateHandler: ((candidate: any) => void) | undefined;

  private _onMessageHandler: ((msg: any) => void) | undefined;

  private _onDisconnectionHandler: (() => void) | undefined;

  setSlaveId(slaveId: string): MasterP2PConnectionBuilder {
    this._slaveId = slaveId;
    return this;
  }

  setOperationId(operationId: string): MasterP2PConnectionBuilder {
    this._operationId = operationId;
    return this;
  }

  setOnIceCandidateHandler(
    onIceCandidateHandler: (candidate: any) => void
  ): MasterP2PConnectionBuilder {
    this._onIceCandidateHandler = onIceCandidateHandler;
    return this;
  }

  setOnMessageHandler(
    onMessageHandler: (msg: any) => void
  ): MasterP2PConnectionBuilder {
    this._onMessageHandler = onMessageHandler;
    return this;
  }

  setOnDisconnectionHandler(
    onDisconnectionHandler: () => void
  ): MasterP2PConnectionBuilder {
    this._onDisconnectionHandler = onDisconnectionHandler;
    return this;
  }

  build(): MasterP2PConnection {
    if (
      this._slaveId === undefined ||
      this._operationId === undefined ||
      this._onDisconnectionHandler === undefined ||
      this._onIceCandidateHandler === undefined ||
      this._onMessageHandler === undefined
    ) {
      throw new Error('Incorrect MasterP2PConnection build');
    }
    return new MobileMasterP2PConnection(
      this._slaveId,
      this._operationId,
      this._onIceCandidateHandler,
      this._onMessageHandler,
      this._onDisconnectionHandler
    );
  }
}
