export class ApiSession {
    constructor({ hClient, operatorInfo }: {
        hClient: any;
        operatorInfo: any;
    });
    _hClient: any;
    _opInfo: any;
    /**
     * Returns true if the provided {@see solidityAddress } also owns this ApiSession and false otherwise.
     * @param {object} options
     * @param {string} options.solidityAddress
     */
    isOperatedBy({ solidityAddress }: {
        solidityAddress: string;
    }): boolean;
    /**
     * Given an {@see Uploadable}, it triest ot upload it using the currently configured {@see Client} passing in-it any provided {@see args}.
     *
     * @param {Uploadable} what - The {@see Uploadable} to push thrugh this {@see ApiSession}
     * @param {*} args - A list of arguments to pass through the upload operation itself.
     *                   Note: this list has, by convention, at various unpaking stages in the call hierarchy, the capabilities to specify SDK behaviour through
     *                         eg. "_file" ({@see Uploadable}) or "_contract" ({@see Contract})
     * @returns - Whatever the underlying Uploadable sees fit following a successful content push. Usually this is a {@see Receipt} of some kind or a higher-level
     *            managed instance ({@see LiveContract}).
     */
    upload(what: Uploadable, ...args: any): Promise<any>;
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
}
import { Uploadable } from "./Uploadable";
import { ContractId } from "@hashgraph/sdk/lib/exports";
import { Interface } from "@ethersproject/abi";
import { LiveContract } from "./LiveContract";
