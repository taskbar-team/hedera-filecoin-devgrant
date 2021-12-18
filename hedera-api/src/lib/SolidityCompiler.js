"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolidityCompiler = exports.VIRTUAL_SOURCE_CONTRACT_FILE_NAME = void 0;
const tslib_1 = require("tslib");
const fs = require("fs");
const sdkPath = require("path");
const solc = require("solc");
exports.VIRTUAL_SOURCE_CONTRACT_FILE_NAME = '__contract__.sol';
class SolidityCompiler {
    static compile({ code, path }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const basePath = sdkPath.resolve(process.env.CONTRACTS_RELATIVE_PATH || 'contracts');
            const content = (code ? code : fs.readFileSync(sdkPath.join(basePath, path), 'utf8'));
            // Note: Further options and info is available 
            //       here https://docs.soliditylang.org/en/v0.8.10/using-the-compiler.html#input-description and
            //       here https://docs.soliditylang.org/en/v0.8.10/using-the-compiler.html#compiler-input-and-output-json-description
            const solInput = {
                language: 'Solidity',
                sources: { [exports.VIRTUAL_SOURCE_CONTRACT_FILE_NAME]: { content } },
                settings: {
                    metadata: {
                        // disabling metadata hash embedding to make the bytecode generation predictable at test-time
                        // see https://docs.soliditylang.org/en/latest/metadata.html#encoding-of-the-metadata-hash-in-the-bytecode
                        bytecodeHash: process.env.NODE_ENV === 'test' ? 'none' : 'ipfs'
                    },
                    outputSelection: {
                        '*': {
                            '*': ['*']
                        }
                    }
                }
            };
            const stringifiedSolInput = JSON.stringify(solInput);
            const importPrefixes = [
                // prioritize the root contract folder followed by the base-path one (usually 'contracts' if CONTRACTS_RELATIVE_PATH is not provided)
                ...(path ? [sdkPath.join(basePath, sdkPath.dirname(path)), ""] : [""]),
                // then look at the project's node_modules
                sdkPath.join(process.cwd(), "node_modules"),
                // then expand all the environment provided prefixes (if any)
                ...(process.env.CONTRACTS_INCLUDED_PREFIXES ? process.env.CONTRACTS_INCLUDED_PREFIXES.split(/\s*,\s*/) : [])
            ];
            const importsResolver = (sourcePath) => {
                for (const prefix of importPrefixes) {
                    let resolvedSourcePath;
                    // Narrow down on the absolute imported source-path to use
                    if (sdkPath.isAbsolute(sourcePath)) {
                        resolvedSourcePath = sourcePath;
                    }
                    else if (sdkPath.isAbsolute(prefix)) {
                        resolvedSourcePath = sdkPath.join(prefix, sourcePath);
                    }
                    else {
                        resolvedSourcePath = sdkPath.join(basePath, prefix, sourcePath);
                    }
                    if (fs.existsSync(resolvedSourcePath)) {
                        try {
                            return { 'contents': fs.readFileSync(resolvedSourcePath).toString('utf8') };
                        }
                        catch (e) {
                            return { error: 'Error reading ' + resolvedSourcePath + ': ' + e };
                        }
                    }
                }
                return { error: 'File not found inside the base path or any of the include paths.' };
            };
            return solc.compile(stringifiedSolInput, { import: importsResolver });
        });
    }
}
exports.SolidityCompiler = SolidityCompiler;
//# sourceMappingURL=SolidityCompiler.js.map