export class Contract extends Uploadable {
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
    static newFrom({ code, index, ignoreWarnings, name, path }: {
        code: string;
        index?: number | undefined;
        ignoreWarnings?: boolean | undefined;
        name?: string | undefined;
        path: string;
    }): Promise<Contract>;
    /**
     * Returns all the contracts present in a given {@param options.code}.
     *
     * @param {Object} options - Provides a source and controls various {@see Contract} construction settings.
     * @param {string} options.code - The Solidity code to build the contracts from.
     * @param {boolean} [options.ignoreWarnings=false] - Should we fail at compile-time warnings or not?
     * @param {string} options.path - The top-level solidity code file path
     * @returns {Promise<Array<Contract>>} - A list of {@see Contract}s parsed via Hedera's officially supported solidity version compiler (`solc`) from the code
     */
    static allFrom({ code, ignoreWarnings, path }: {
        code: string;
        ignoreWarnings?: boolean | undefined;
        path: string;
    }): Promise<Array<Contract>>;
    /**
     * Deserializes the provided Contract representation which is assumed to be the output of the {@see Contract.serialize} method call.
     *
     * @param {string} what
     * @returns {Contract}
     */
    static deserialize(what: string): Contract;
    static _tryParsingCompileResultFrom({ rawCompileResult, ignoreWarnings }: {
        rawCompileResult: any;
        ignoreWarnings: any;
    }): any;
    /**
     * @private
     */
    private constructor();
    _name: any;
    _byeCode: any;
    _interface: Interface;
    get byteCode(): any;
    /**
     * Retrieves the Contract's Application Binary Interface (ABI) specs.
     * {@link https://docs.soliditylang.org/en/v0.8.10/abi-spec.html#json}
     * @returns {Interface}
     */
    get interface(): Interface;
    get name(): any;
    /**
     * Tests if this contract is the same (functionally speaking) as another one.
     *
     * @param {Contract} other
     * @returns
     */
    equals(other: Contract): boolean;
    /**
     * Serializes the current entity. This then can be reversed via calling {@see Contract.deserialize}.
     *
     * Note: when de-serializing, the properties exported here should allow for a complete re-instantiation of the original {@see Contract}.
     *
     * @returns {string} - The serialized representation of the current instance
     */
    serialize(): string;
    /**
     * @private
     */
    private _getContractCreateOptionsFor;
}
import { Uploadable } from "./Uploadable";
import { Interface } from "@ethersproject/abi";
