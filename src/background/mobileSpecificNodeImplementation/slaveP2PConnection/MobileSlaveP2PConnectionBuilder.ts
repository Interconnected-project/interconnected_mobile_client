import {
  SlaveP2PConnection,
  SlaveP2PConnectionBuilder,
} from 'interconnected_node';
import MobileSlaveP2PConnection from './MobileSlaveP2PConnection';

export default class MobileSlaveP2PConnectionBuilder
  implements SlaveP2PConnectionBuilder
{
  private _masterId: string | undefined;

  private _masterRole: string | undefined;

  private _operationId: string | undefined;

  private _onIceCandidateHandler: ((candidate: any) => void) | undefined;

  private _onMessageHandler: ((msg: any) => void) | undefined;

  private _onDisconnectionHandler: (() => void) | undefined;

  setMasterId(masterId: string): SlaveP2PConnectionBuilder {
    this._masterId = masterId;
    return this;
  }

  setMasterRole(masterRole: string): SlaveP2PConnectionBuilder {
    this._masterRole = masterRole;
    return this;
  }

  setOperationId(operationId: string): SlaveP2PConnectionBuilder {
    this._operationId = operationId;
    return this;
  }

  setOnIceCandidateHandler(
    onIceCandidateHandler: (candidate: any) => void
  ): SlaveP2PConnectionBuilder {
    this._onIceCandidateHandler = onIceCandidateHandler;
    return this;
  }

  setOnMessageHandler(
    onMessageHandler: (msg: any) => void
  ): SlaveP2PConnectionBuilder {
    this._onMessageHandler = onMessageHandler;
    return this;
  }

  setOnDisconnectionHandler(
    onDisconnectionHandler: () => void
  ): SlaveP2PConnectionBuilder {
    this._onDisconnectionHandler = onDisconnectionHandler;
    return this;
  }

  build(): SlaveP2PConnection {
    if (
      this._masterId === undefined ||
      this._masterRole === undefined ||
      this._operationId === undefined ||
      this._onDisconnectionHandler === undefined ||
      this._onIceCandidateHandler === undefined ||
      this._onMessageHandler === undefined
    ) {
      throw new Error('Incorrect SlaveP2PConnection build');
    }
    return new MobileSlaveP2PConnection(
      this._masterId,
      this._masterRole,
      this._operationId,
      this._onIceCandidateHandler,
      this._onMessageHandler,
      this._onDisconnectionHandler
    );
  }
}
