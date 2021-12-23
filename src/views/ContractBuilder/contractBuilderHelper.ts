import {Contract} from "hedera-api";
import {BigNumber} from 'bignumber.js'
import {NO_OF_TASKS_PER_REGISTRY} from "../../utilities/constants";

const ContractBuilderHelper = {
  deployContracts: async ({hapiSession, onStatusChange}: any) => {
    const maxNrOfTasksPerRegistry = new BigNumber(NO_OF_TASKS_PER_REGISTRY);

    onStatusChange('Init session');

    const {
      CappedRegistryHelper,
      RegistryManager,
      TaskRegistry
    } = ContractRegistry;

    onStatusChange('Uploading CappedRegistryHelper');
    const cappedRegistryLiveContract = await hapiSession.upload(Contract.deserialize(CappedRegistryHelper), maxNrOfTasksPerRegistry);

    onStatusChange('Uploading TaskRegistry');
    const taskRegistryLiveContract = await hapiSession.upload(Contract.deserialize(TaskRegistry));

    onStatusChange('Uploading TaskRegistryManager');
    const taskRegistryManagerLiveContract = await hapiSession.upload(
      Contract.deserialize(RegistryManager),
      taskRegistryLiveContract.id.toSolidityAddress(),
      cappedRegistryLiveContract.id.toSolidityAddress()
    );

    onStatusChange('Successful deployed');

    return {
      taskRegistry: taskRegistryLiveContract,
      cappedRegistryHelper: cappedRegistryLiveContract,
      taskRegistryManager: taskRegistryManagerLiveContract
    }
  },

  getLiveContract: async ({hapiSession, lastDeployed, onStatusChange}: any) => {
    const {id, abi} = lastDeployed;
    onStatusChange('Fetching deployed contract');

    return await hapiSession.getLiveContract({id, abi});
  }
}

export default ContractBuilderHelper
