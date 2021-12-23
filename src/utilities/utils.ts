import {DEPLOYED_CONTRACT_KEY} from "./constants";

export default {
  getLastDeployed: () => {
    try {
      const contract = localStorage.getItem(DEPLOYED_CONTRACT_KEY);
      const parsedContract = contract && JSON.parse(contract);

      return parsedContract;
    }catch (e) {
      console.error(e)
    }
  },

  setLastDeployed: (liveContracts: any) => {
    const {taskRegistry, cappedRegistryHelper} = liveContracts;
    const id = taskRegistry.id.toString();
    const abi = JSON.parse(ContractRegistry.TaskRegistry).abi;
    const cappedRegistryID = cappedRegistryHelper.id.toSolidityAddress();

    try {
      const serializedContract = JSON.stringify({id, abi, cappedRegistryID});
      localStorage.setItem(DEPLOYED_CONTRACT_KEY, serializedContract);
    }catch (e) {
      console.error(e)
    }
  },

  removeLastDeployed: () => {
      localStorage.removeItem(DEPLOYED_CONTRACT_KEY);
  },

  stringToBytes: (value: string, length: number) => {
    try {
      const bytesArray = new Uint8Array(length);
      const encoded = new TextEncoder().encodeInto(value, bytesArray);

      if(encoded.written !== encoded.read){
        throw 'String encoding failed'
      }

      return bytesArray
    } catch (e) {
      console.error(e)
    }
  }
}
