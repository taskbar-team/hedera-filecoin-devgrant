"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractFunctionParametersParser = exports.HContractFunctionParameters = void 0;
const abi_1 = require("@ethersproject/abi");
const sdk_1 = require("@hashgraph/sdk");
const bignumber_js_1 = require("bignumber.js");
const ParamTypeToFunctionNameMapper_1 = require("./ParamTypeToFunctionNameMapper");
class HContractFunctionParameters extends sdk_1.ContractFunctionParameters {
    /**
     * Given a set of user-defined arguments and starting from the provided function/constructor interface definition,
     * facilitates the construction of a {@see ContractFunctionParameters} ready to be embedded in a Contract transaction/query.
     *
     * @param {ConstructorFragment|FunctionFragment} fDescription - The function/constructor schema
     * @param {Array} args - A list of arguments to be parsed into the underlying AbiDescription
     * @returns {ContractFunctionParameters} - A Hedera managed function-parameters object
     */
    constructor(fDescription, args = []) {
        super();
        if (fDescription instanceof abi_1.ConstructorFragment === false && fDescription instanceof abi_1.FunctionFragment === false) {
            throw new ContractFunctionParametersParser("In order to create a contract-function-arguments instance we need a valid constructor/function fragment instance provided.");
        }
        else if (!Array.isArray(args)) {
            throw new ContractFunctionParametersParser("I need an array of args in order to construct the ContractFunctionParameters instance for.");
        }
        else if (fDescription.inputs.length !== args.length) {
            throw new ContractFunctionParametersParser(`The contract expects ${fDescription.inputs.length} arguments yet ${args.length} were provided.`);
        }
        args.forEach((arg, id) => {
            const fInputDescription = fDescription.inputs[id];
            const fctCallName = new ParamTypeToFunctionNameMapper_1.ParamTypeToFunctionNameMapper(fInputDescription).map({ prefix: 'add' });
            const shouldUseBigNumbers = (fctCallName.indexOf("64") !== -1 || fctCallName.indexOf("256")) && fInputDescription.type !== 'address';
            let argToAdd = arg;
            // TODO: refactor this better maybe?
            // TODO: check if type of 'val' is accepted by the 'inputDefs[id].type' type
            if (shouldUseBigNumbers) {
                if (Array.isArray(arg)) {
                    argToAdd = arg.map(v => v instanceof bignumber_js_1.BigNumber ? v : new bignumber_js_1.BigNumber(v));
                }
                else {
                    argToAdd = arg instanceof bignumber_js_1.BigNumber ? arg : new bignumber_js_1.BigNumber(arg);
                }
            }
            this[fctCallName](argToAdd);
        });
    }
}
exports.HContractFunctionParameters = HContractFunctionParameters;
class ContractFunctionParametersParser extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.ContractFunctionParametersParser = ContractFunctionParametersParser;
//# sourceMappingURL=HContractFunctionParameters.js.map