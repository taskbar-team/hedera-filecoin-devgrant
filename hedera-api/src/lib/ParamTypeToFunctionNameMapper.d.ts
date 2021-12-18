export class ParamTypeToFunctionNameMapper {
    /**
     * @param {ParamType} paramType
     * @returns
     */
    constructor(paramType: ParamType);
    _paramType: ParamType;
    map({ prefix }: {
        prefix?: string | undefined;
    }): string;
    /**
     * Retrieves the canonical value of the provided param type-definition such as an 'int256' whenever referencing its shorter form, 'int'.
     *   See {@link https://docs.soliditylang.org/en/v0.8.10/abi-spec.html#types} for a list of such mappings.
     *
     * @param {ParamType} paramType
     * @returns
     */
    _geCanonicalTypeFor(paramType: ParamType): string;
    /**
     * Given a type-name, it maps it to the Hedera Equivalent function-name expected value ready to be used in an actual SDK call
     * such as a 'get'-ing operation or an 'add'-ing one.
     *   Ex. 'uint256[]' would get mapped to 'Uint256Array' which, when 'add'-ing, would end up to be used as 'addUint256Array'.
     *
     * @param {string} typeName - the type-name to convert
     * @returns
     */
    _getFunctionParticleFor(typeName: string): any;
}
import { ParamType } from "@ethersproject/abi";
