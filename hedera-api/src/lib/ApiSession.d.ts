export class ApiSession {
    constructor({ hClient, operatorInfo }: {
        hClient: any;
        operatorInfo: any;
    });
    _hClient: any;
    _opInfo: any;
    /**
     * Retrieves the operator account-id for this {@link ApiSession}.
     */
    get accountId(): any;
    /**
     * Returns true if the provided {@see solidityAddress } also owns this {@link ApiSession} and false otherwise.
     * @param {object} options
     * @param {string} options.solidityAddress
     */
    isOperatedBy({ solidityAddress }: {
        solidityAddress: string;
    }): boolean;
    /**
     * Given an {@link Uploadable}, it triest ot upload it using the currently configured {@link Client} passing in-it any provided {@see args}.
     *
     * @param {Uploadable | JSON} what - The {@link Uploadable} or a {@link Json}-acceptable payload to push through this {@link ApiSession}
     * @param {*} args - A list of arguments to pass through the upload operation itself.
     *                   Note: this list has, by convention, at various unpaking stages in the call hierarchy, the capabilities to specify SDK behaviour through
     *                         eg. "_file" ({@link Uploadable}) or "_contract" ({@link Contract})
     * @returns - Whatever the underlying Uploadable sees fit following a successful content push. Usually this is a {@link Receipt} of some kind or a higher-level
     *            managed instance ({@link LiveContract}).
     */
    upload(what: any | JSON, ...args: any): Promise<any>;
    /**
     * Loads a pre-deployed {@link LiveContract} ready to be called into at runtime. The contract-interface is passed in raw-ly
     * through the {@see abi} param.
     *
     * @param {object} options
     * @param {ContractId | string} options.id - the contract-id to load
     * @param {Interface|Array} options.abi - either the etherjs contract interface or the etherjs Interface compatible ABI
     *                                        definitions to use with the resulting live-contract
     * @returns {LiveContract}
     */
    getLiveContract({ id, abi }: {
        id: ContractId | string;
        abi: Interface | any[];
    }): LiveContract;
    /**
     * Given a {@link FileId} of a deployed {@link Json} instance, retrieves a {@link LiveJson} reference ready to be used
     * @param {object} options
     * @param {FileId | string} options.id - the file-id to load
     * @returns {LiveJson}
     */
    getLiveJson({ id }: {
        id: FileId | string;
    }): LiveJson;
}
import { ContractId } from "@hashgraph/sdk/lib/exports";
import { Interface } from "@ethersproject/abi";
import { LiveContract } from "./live/LiveContract";
import { FileId } from "@hashgraph/sdk/lib/exports";
import { LiveJson } from "./live/LiveJson";
