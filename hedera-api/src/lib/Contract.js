"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const tslib_1 = require("tslib");
const sdk_1 = require("@hashgraph/sdk");
const Uploadable_1 = require("./Uploadable");
const CompileIssues_1 = require("./errors/CompileIssues");
const LiveContract_1 = require("./LiveContract");
const HContractFunctionParameters_1 = require("./HContractFunctionParameters");
const abi_1 = require("@ethersproject/abi");
const SolidityCompiler_1 = require("./SolidityCompiler");
const DEFAULT_GAS_FOR_CONTRACT_CREATION = 75000;
class Contract extends Uploadable_1.Uploadable {
    /**
     * Given an index or a name, this returns a specific contract following the successfull compilation of
     * either the contract code itself ({@param options.code}) or the solidity file located at the provided {@param options.path}
     *
     * In terms of precidence, it first checks to see if the {@param options.name} is provided and, if so, it uses that otherwise
     * it looks at the {@param options.index} one and goes with that.
     *
     * @param {Object} options - Provides a source and controls various {@see Contract} construction settings.
     * @param {string} options.code - The Solidity code to build the contracts from.
     * @param {number} [options.index=0] - The Contract index to retrieve (if the name is not provided).
     * @param {boolean} [options.ignoreWarnings=false] - Should we fail at compile-time warnings or not?
     * @param {string} [options.name] - The Contract we wish to retrieve (if no index is provided).
     * @param {string} options.path - The top-level solidity code file path
     * @returns {Promise<Contract>}
     */
    static newFrom({ code, index = 0, ignoreWarnings = false, name, path }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!code && !path) {
                throw new Error("In order to continue, either provide the direct solidity code or a file path where the top-level code resides.");
            }
            if (!name && (!!index || (Number.isInteger(index) && index < 0))) {
                throw new Error("Please provide either a non-negative index or the actual name of the contract to reference the Contract instance with.");
            }
            const contracts = yield Contract.allFrom({ code, ignoreWarnings, path });
            if (name) {
                const contractOfInterest = contracts.find(contract => contract.name === name);
                if (!contractOfInterest) {
                    throw new Error(`There is no such contract named '${name}' present in the referenced code.`);
                }
                return contractOfInterest;
            }
            else if (index >= contracts.length) {
                throw new Error(`Index out of range. Your requested contract-id ${index} is not in range of the ${contracts.length} contracts present in the given code.`);
            }
            return contracts[index];
        });
    }
    /**
     * Returns all the contracts present in a given {@param options.code}.
     *
     * @param {Object} options - Provides a source and controls various {@see Contract} construction settings.
     * @param {string} options.code - The Solidity code to build the contracts from.
     * @param {boolean} [options.ignoreWarnings=false] - Should we fail at compile-time warnings or not?
     * @param {string} options.path - The top-level solidity code file path
     * @returns {Promise<Array<Contract>>} - A list of {@see Contract}s parsed via Hedera's officially supported solidity version compiler (`solc`) from the code
     */
    static allFrom({ code, ignoreWarnings = false, path }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!code && !path) {
                throw new Error("Can only retrieve contracts if either the direct solidity code is provided or a file path where that top-level code resides.");
            }
            const rawCompileResult = yield SolidityCompiler_1.SolidityCompiler.compile({ code, path });
            const compileResult = Contract._tryParsingCompileResultFrom({ rawCompileResult, ignoreWarnings });
            const compiledContractsInfo = compileResult.contracts[SolidityCompiler_1.VIRTUAL_SOURCE_CONTRACT_FILE_NAME];
            let contracts = [];
            for (const contractName of Object.keys(compiledContractsInfo)) {
                const solo = compiledContractsInfo[contractName];
                contracts.push(new Contract({
                    name: contractName,
                    abi: solo.abi,
                    byteCode: solo.evm.bytecode.object
                }));
            }
            return contracts;
        });
    }
    static deserialize(what) {
        if (!what) {
            throw new Error("Please provide something to be deserialized.");
        }
        const jWhat = JSON.parse(what);
        return new Contract(...jWhat);
    }
    static _tryParsingCompileResultFrom({ rawCompileResult, ignoreWarnings }) {
        const compileResult = JSON.parse(rawCompileResult);
        CompileIssues_1.CompileIssues.tryThrowingIfErrorsIn({ compileResult, ignoreWarnings });
        return compileResult;
    }
    /**
     * @private
     */
    constructor({ name, abi, byteCode }) {
        // TODO: validate arguments!
        super();
        this._name = name;
        this._byeCode = byteCode;
        this._interface = new abi_1.Interface(abi);
    }
    get byteCode() {
        return this._byeCode;
    }
    /**
     * Retrieves the Contract's Application Binary Interface (ABI) specs.
     * {@link https://docs.soliditylang.org/en/v0.8.10/abi-spec.html#json}
     * @returns {Interface}
     */
    get interface() {
        return this._interface;
    }
    get name() {
        return this._name;
    }
    /**
     * Tests if this contract is the same (functionally speaking) as another one.
     *
     * @param {Contract} other
     * @returns
     */
    equals(other) {
        if (other instanceof Contract === false) {
            return false;
        }
        return this.byteCode === other.byteCode;
    }
    /**
     * Serializes the current entity. This then can be reversed via calling {@see Contract.deserialize}.
     *
     * Note: when de-serializing, the properties exported here should allow for a complete re-instantiation of the original {@see Contract}.
     *
     * @returns {string} - The serialized representation of the current instance
     */
    serialize() {
        return JSON.stringify({
            name: this.name,
            byteCode: this.byteCode,
            abi: this.interface.format()
        });
    }
    /**
     * @override
     * @protected
     */
    _getContent() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.byteCode;
        });
    }
    /**
     * Having a file-create {@link receipt} provided, this function uses it to create a contract via the Hedera Contract Service (HCS). The provided {@link args}
     * are used both to populate the {@see ContractCreateTransaction} constructor (if the first object from the list has a '_contract' property) and to pass along
     * as constructor arguments when publishing the Contract.
     * If there is a constructor config object present (first args from list if it has the '_contract' property) this is consumed and the remainder of the arguments
     * are passed to the Contract constructor.
     *
     * @override
     * @protected
     */
    _onFileUploaded({ client, receipt, args = [] }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const createContractTransaction = new sdk_1.ContractCreateTransaction(this._getContractCreateOptionsFor({ client, receipt, args }));
            return yield LiveContract_1.LiveContract.newFor({
                client,
                contract: this,
                createContractTransaction
            });
        });
    }
    /**
     * @private
     */
    _getContractCreateOptionsFor({ client, receipt, args = [] }) {
        const contractFileId = receipt.fileId;
        const constructorDefinition = this._interface.deploy;
        let contractCreationOverrides = {};
        if (args.length > 0 && Object.keys(args[0]).length !== 0 && Object.keys(args[0])[0] === '_contract') {
            contractCreationOverrides = args[0]._contract;
            args = args.slice(1);
        }
        return Object.assign({}, Object.assign({ adminKey: client.operatorPublicKey, bytecodeFileId: contractFileId, constructorParameters: new HContractFunctionParameters_1.HContractFunctionParameters(constructorDefinition, args), gas: DEFAULT_GAS_FOR_CONTRACT_CREATION }, contractCreationOverrides));
    }
}
exports.Contract = Contract;
//# sourceMappingURL=Contract.js.map