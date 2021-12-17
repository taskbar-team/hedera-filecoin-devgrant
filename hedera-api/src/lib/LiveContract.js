"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveContractExecutionError = exports.LiveContractCreationError = exports.LiveContract = exports.DEFAULT_GAS_PER_CONTRACT_TRANSACTION = void 0;
const tslib_1 = require("tslib");
const bignumber_js_1 = require("bignumber.js");
const sdk_1 = require("@hashgraph/sdk");
const Contract_1 = require("./Contract");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const abi_1 = require("@ethersproject/abi");
const HContractFunctionParameters_1 = require("./HContractFunctionParameters");
const ParamTypeToFunctionNameMapper_1 = require("./ParamTypeToFunctionNameMapper");
const EventEmitter = require("events");
exports.DEFAULT_GAS_PER_CONTRACT_TRANSACTION = 69000;
class LiveContract extends EventEmitter {
    /**
     * Constructs a new LiveContract to be interacted with.
     *
     * @param {object} options
     * @param {Client} options.client
     * @param {Contract} options.contract
     * @param {ContractCreateTransaction} options.createContractTransaction
     */
    static newFor({ client, contract, createContractTransaction }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (client instanceof sdk_1.Client === false ||
                contract instanceof Contract_1.Contract === false ||
                createContractTransaction instanceof sdk_1.ContractCreateTransaction === false) {
                throw new Error("We need a reference to the underlying client tranport, the contract blueprint being deployed and " +
                    "a referance to the pre-filled contract-create transaction in order to execute the transaction and create the live-contract link.");
            }
            const contractTransactionResponse = yield createContractTransaction.execute(client);
            const createdContractReceipt = yield contractTransactionResponse.getReceipt(client);
            if (createdContractReceipt.status !== sdk_1.Status.Success) {
                throw new LiveContractCreationError(createdContractReceipt.status);
            }
            return new LiveContract({
                client,
                id: createdContractReceipt.contractId,
                cInterface: contract.interface,
            });
        });
    }
    constructor({ client, id, cInterface }) {
        super();
        if (client instanceof sdk_1.Client === false ||
            id instanceof sdk_1.ContractId === false ||
            cInterface instanceof abi_1.Interface === false) {
            throw new LiveContractCreationError("In order to create a new live-contract instance we would need a Hedera Client, a ContractId and a managed Contract Interface.");
        }
        this._client = client;
        this._id = id;
        this._interface = cInterface;
        // Dinamically inject ABI function handling
        Object.values(this._interface.functions).forEach(fDescription => Object.defineProperty(this, fDescription.name, {
            enumerable: true,
            value: (function (fDescription, ...args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const request = this._createContractRequestFor({ fDescription, args });
                    const txResponse = yield request.execute(this._client);
                    let functionResult = txResponse;
                    if (!fDescription.constant) {
                        const txRecord = yield txResponse.getRecord(this._client);
                        this._tryToProcessForEvents(txRecord);
                        if (txRecord.receipt.status !== sdk_1.Status.Success) {
                            throw new LiveContractExecutionError(`Receveid a non-successfull status message ${txRecord.receipt.status}`);
                        }
                        functionResult = txRecord.contractFunctionResult;
                    }
                    return yield this._tryExtractingResponse(functionResult, fDescription);
                });
            }).bind(this, fDescription),
            writable: false,
        }));
    }
    get id() {
        return this._id;
    }
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
    _createContractRequestFor({ fDescription, args }) {
        let constructorOptionsPresentInArgs = false;
        let constructorArgs = {
            contractId: this.id,
            gas: exports.DEFAULT_GAS_PER_CONTRACT_TRANSACTION
        };
        let contractRequest;
        // Try to pick up any specific constructor arguments provided at call-time such as 'gas' or 'amount' to transfer
        if (args && args.length > 0) {
            if (Number.isInteger(args[0].gas)) {
                constructorArgs.gas = args[0].gas;
                constructorOptionsPresentInArgs = true;
            }
            if (!fDescription.constant) {
                if (Number.isInteger(args[0].amount)) {
                    constructorArgs.amount = args[0].amount;
                    constructorOptionsPresentInArgs = true;
                }
            }
        }
        if (constructorOptionsPresentInArgs) {
            args = args.slice(1);
        }
        contractRequest = fDescription.constant ? new sdk_1.ContractCallQuery(constructorArgs) : new sdk_1.ContractExecuteTransaction(constructorArgs);
        contractRequest.setFunction(fDescription.name, new HContractFunctionParameters_1.HContractFunctionParameters(fDescription, args));
        return contractRequest;
    }
    /**
     * Given a contract-request response (txResponse) and a targeted function-description, it tries to extract and prepare the caller response based on
     * the contract's output function ABI specs.
     *
     * @param {*} txResponse
     * @param {FunctionFragment} fDescription
     * @returns
     */
    _tryExtractingResponse(txResponse, fDescription) {
        // TODO: look at txResponse.logs and txResponse.errorMessage
        return new Promise((accept, reject) => {
            let parsedResponse = fDescription.outputs.map((oDef, id) => {
                try {
                    const varVal = txResponse[new ParamTypeToFunctionNameMapper_1.ParamTypeToFunctionNameMapper(oDef).map({ prefix: 'get' })](id);
                    return oDef.name ? { [oDef.name]: varVal } : varVal;
                }
                catch (e) {
                    reject(new LiveContractExecutionError(`Don't know yet how to parse '${oDef.type}' from a response. ` +
                        "You might want to report this to the development team."));
                }
            });
            if (parsedResponse.length > 0) {
                if (typeof parsedResponse[0] !== 'object' || parsedResponse[0] instanceof bignumber_js_1.BigNumber) {
                    if (parsedResponse.length === 1) {
                        parsedResponse = parsedResponse[0];
                    }
                }
                else {
                    parsedResponse = parsedResponse.reduce((p, c) => (Object.assign(Object.assign({}, p), c)), {});
                }
            }
            else {
                // No response provided
                parsedResponse = undefined;
            }
            accept(parsedResponse);
        });
    }
    /**
     * Given the Record of a transaction, we try to see if there have been any events emitted and, if so, we re-emit them on the live-contract instance.
     * @param {TransactionRecord} txRecord
     */
    _tryToProcessForEvents(txRecord) {
        txRecord.contractFunctionResult.logs.forEach(recordLog => {
            const data = recordLog.data.length === 0 ? new Uint8Array() : "0x" + recordLog.data.toString('hex');
            const topics = recordLog.topics.map(topic => "0x" + topic.toString('hex'));
            const logDescription = this._interface.parseLog({ data, topics });
            if (logDescription !== null) {
                const decodedEventObject = Object.keys(logDescription.args)
                    .filter(evDataKey => isNaN(evDataKey))
                    .map(namedEvDataKey => ({ [namedEvDataKey]: logDescription.args[namedEvDataKey] }))
                    .reduce((p, c) => (Object.assign(Object.assign({}, p), c)), {});
                try {
                    this.emit(logDescription.name, decodedEventObject);
                }
                catch (e) {
                    if (process.env.NODE_ENV === 'test') {
                        // We re-interpret and throw it so that any tests running will be aware of it
                        throw new Error(`The event-emitter handle '${logDescription.name}' failed to execute with the following reason: ${e.message}`);
                    }
                    // otherwise, it's a No-op
                }
            }
        });
    }
}
exports.LiveContract = LiveContract;
class LiveContractCreationError extends Error {
    /**
     * @param {Status} status
     */
    constructor(status) {
        super(`There was an issue (status ${status}) creating the live-contract link.`);
    }
}
exports.LiveContractCreationError = LiveContractCreationError;
class LiveContractExecutionError extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.LiveContractExecutionError = LiveContractExecutionError;
//# sourceMappingURL=LiveContract.js.map