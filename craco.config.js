require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const { Contract } = require('hedera-api');

const ContractsOfInterest = [
    "TaskRegistry",
    "CappedRegistryHelper",
    "RegistryManager"
];

async function getContractsRegistry() {
    // Go through all the ContractsOfInterest and build them, resolving the resulting promises in the process
    const promisedContracts = ContractsOfInterest
        .map(coi => ({ name: coi, path: `./${coi}.sol` }))
        .map(({ name, path }) => Contract.newFrom({ name, path, ignoreWarnings: true }));
    const compiledContracts = await Promise.all(promisedContracts);

    // Reduce everything to an object, mapping the ContractsOfInterests to the actual Contract representation
    return compiledContracts
        .map(compiledCoi => ({ [compiledCoi.name]: compiledCoi.serialize() }))
        .reduce((p, c) => ({...p, ...c}), {});
}

module.exports = async function() {
    const ContractRegistry = await getContractsRegistry();

    return {
        webpack: {
            plugins: [
                new webpack.DefinePlugin({
                    ContractRegistry: JSON.stringify(ContractRegistry),
                    "process.env": JSON.stringify(process.env)
                }),
                // Removing solidity-compiler imports so that browser does not complain about not being able to load it
                new webpack.NormalModuleReplacementPlugin(
                    /solc/, 
                    path.resolve(__dirname, './src/utilities/mocked_solc.js')
                ),
            ]
        }
    };
}
