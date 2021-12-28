import {DEPLOYED_CONTRACT_KEY, PAYMENT_TYPES} from "./constants";
import {FixedRate, HourlyRate} from "../components/CreateTask/TaskPayment";

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

  getInitialPaymentState: (paymentType: string) => {
    const payment = PAYMENT_TYPES.find(payment => payment.type === paymentType);

    return paymentType === PAYMENT_TYPES[0].type
      ? payment?.value as HourlyRate
      : payment?.value as FixedRate;
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
  },

  hexToString: (hex: string) => {
    try {
      const bytes = new Uint8Array(hex.length / 2);
      for (let i = 0; i < hex.length / 2; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
      }

      const s = new TextDecoder().decode(bytes);
      return s.replace(/[\x00-\x1F\x7F-\xA0]+/g, '')
    } catch (e) {
      console.error(e)
    }
  },

  getSecondsFromDate: function(dateString: string) {
    try {
      const now = new Date();
      const date = new Date(dateString);
      const diff = date.getTime() - now.getTime();

      return Math.floor(diff / 1000);
    } catch (e) {
      console.error(e)
    }
  },

  getDateFromTimestamp: function(timestamp: number) {
    try {
      const date = new Date(timestamp * 1000);

      return date;
    } catch (e) {
      console.error(e)
    }
  },

  getDaysFromDate: function(date: Date) {
    try {
      const now = new Date();
      const diff = date.getTime() - now.getTime();

      return Math.floor(diff / (1000 * 60 * 60 * 24));
    } catch (e) {
      console.error(e)
    }
  },

  getHoursFromTaskDeadline: function(deadlineData: Date) {
    try {
      const now = new Date();
      const diff = deadlineData.getTime() - now.getTime();

      return Math.floor(diff / (1000 * 60 * 60));
    } catch (e) {
      console.error(e)
    }
  },

  convertExpiryToDays: function(expiry: number) {
    const expiryDate = this.getDateFromTimestamp(expiry);

    if(!expiryDate){
      return 'The expiry date is invalid';
    }

    return this.getDaysFromDate(expiryDate);
  }
}
