"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSession = void 0;
const tslib_1 = require("tslib");
const abi_1 = require("@ethersproject/abi");
const sdk_1 = require("@hashgraph/sdk");
const LiveContract_1 = require("./LiveContract");
const Uploadable_1 = require("./Uploadable");
class ApiSession {
    constructor({ hClient, operatorInfo }) {
        this._hClient = hClient;
        this._opInfo = operatorInfo;
    }
    /**
     * Returns true if the provided {@see solidityAddress } also owns this ApiSession and false otherwise.
     * @param {object} options
     * @param {string} options.solidityAddress
     */
    isOperatedBy({ solidityAddress }) {
        if (solidityAddress.indexOf('0x') === 0) {
            solidityAddress = solidityAddress.slice(2);
        }
        return this._hClient.operatorAccountId.toSolidityAddress() === solidityAddress;
    }
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
    upload(what, ...args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (what instanceof Uploadable_1.Uploadable === false) {
                throw new Error("Can only upload Uploadable-s.");
            }
            return yield what.uploadTo({ client: this._hClient, args });
        });
    }
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
    getLiveContract({ id, abi = [] }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let targetedContractId;
            try {
                targetedContractId = id instanceof sdk_1.ContractId ? id : sdk_1.ContractId.fromString(id);
            }
            catch (e) {
                throw new Error("Please provide a valid Hedera contract id in order try to lock onto an already-deployed contract.");
            }
            return new LiveContract_1.LiveContract({
                client: this._hClient,
                id: targetedContractId,
                cInterface: abi instanceof abi_1.Interface ? abi : new abi_1.Interface(abi)
            });
        });
    }
}
exports.ApiSession = ApiSession;
//# sourceMappingURL=ApiSession.js.map