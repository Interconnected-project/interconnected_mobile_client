import {
  ClientSpecificP2PConnectionBuilders,
  MasterP2PConnectionBuilder,
  SlaveP2PConnectionBuilder,
} from 'interconnected_node';
import MobileMasterP2PConenctionBuilder from './masterP2PConnection/MobileMasterP2PConnectionBuilder';
import MobileSlaveP2PConnectionBuilder from './slaveP2PConnection/MobileSlaveP2PConnectionBuilder';

export default class MobileP2PConnectionBuilders
  implements ClientSpecificP2PConnectionBuilders
{
  createNewMasterP2PConnectionBuilder(): MasterP2PConnectionBuilder {
    return new MobileMasterP2PConenctionBuilder();
  }

  createNewSlaveP2PConnectionBuilder(): SlaveP2PConnectionBuilder {
    return new MobileSlaveP2PConnectionBuilder();
  }
}
