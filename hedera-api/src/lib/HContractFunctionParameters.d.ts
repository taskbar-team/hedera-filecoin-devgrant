export class HContractFunctionParameters extends ContractFunctionParameters {
    /**
     * Given a set of user-defined arguments and starting from the provided function/constructor interface definition,
     * facilitates the construction of a {@see ContractFunctionParameters} ready to be embedded in a Contract transaction/query.
     *
     * @param {ConstructorFragment|FunctionFragment} fDescription - The function/constructor schema
     * @param {Array} args - A list of arguments to be parsed into the underlying AbiDescription
     * @returns {ContractFunctionParameters} - A Hedera managed function-parameters object
     */
    constructor(fDescription: ConstructorFragment | FunctionFragment, args?: any[]);
}
export class ContractFunctionParametersParser extends Error {
    constructor(msg: any);
}
import { ContractFunctionParameters } from "@hashgraph/sdk/lib/exports";
import { ConstructorFragment } from "@ethersproject/abi";
import { FunctionFragment } from "@ethersproject/abi";
