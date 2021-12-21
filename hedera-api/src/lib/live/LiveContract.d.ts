export const DEFAULT_GAS_PER_CONTRACT_TRANSACTION: 69000;
export class LiveContract extends EventEmitter {
    /**
     * Constructs a new LiveContract to be interacted with.
     *
     * @param {object} options
     * @param {Client} options.client
     * @param {Contract} options.contract
     * @param {ContractCreateTransaction} options.createContractTransaction
     */
    static newFor({ client, contract, createContractTransaction }: {
        client: Client;
        contract: Contract;
        createContractTransaction: ContractCreateTransaction;
    }): Promise<LiveContract>;
    constructor({ client, id, cInterface }: {
        client: any;
        id: any;
        cInterface: any;
    });
    _client: any;
    _id: any;
    _interface: any;
    get id(): any;
    /**
     * Creates a contract query/call request based for the given function-description and the desired arguments (args).
     * The first argument is checked to see if it matches the constructor arguments schema and, if it does, it's used to construct the
     * actual request instance, discarding it in the process so that the remaining arguments can all be used as the actual values sent to
     * the targeted function.
     *
     * @param {object} options
     * @param {FunctionFragment} options.fDescription
     * @param {Array<Object>} options.args
     * @returns {ContractCallQuery | ContractExecuteTransaction}
     */
    _createContractRequestFor({ fDescription, args }: {
        fDescription: FunctionFragment;
        args: Array<Object>;
    }): ContractCallQuery | ContractExecuteTransaction;
    /**
     * Given a contract-request response (txResponse) and a targeted function-description, it tries to extract and prepare the caller response based on
     * the contract's output function ABI specs.
     *
     * @param {*} txResponse
     * @param {FunctionFragment} fDescription
     * @returns
     */
    _tryExtractingResponse(txResponse: any, fDescription: FunctionFragment): Promise<any>;
    /**
     * Given the Record of a transaction, we try to see if there have been any events emitted and, if so, we re-emit them on the live-contract instance.
     * @param {TransactionRecord} txRecord
     */
    _tryToProcessForEvents(txRecord: any): void;
}
export class LiveContractCreationError extends Error {
    /**
     * @param {Status} status
     */
    constructor(status: Status);
}
export class LiveContractExecutionError extends Error {
    constructor(msg: any);
}
import * as EventEmitter from "node/events";
import { FunctionFragment } from "@ethersproject/abi";
import { ContractCallQuery } from "@hashgraph/sdk/lib/exports";
import { ContractExecuteTransaction } from "@hashgraph/sdk/lib/exports";
import { Client } from "@hashgraph/sdk";
import { Contract } from "../static/Contract";
import { ContractCreateTransaction } from "@hashgraph/sdk/lib/exports";
import { Status } from "@hashgraph/sdk/lib/exports";
