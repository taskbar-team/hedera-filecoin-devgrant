"use strict";
module.exports = {
    displayName: 'hedera-api',
    preset: '../../jest.preset.js',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/libs/hedera-api',
    setupFiles: [
        // TODO: remove this since running the tests with the nx @jest:jest runner already imports the .env file into the process
        'dotenv/config'
    ],
    testEnvironment: "./src/test/jte.js",
    testTimeout: 45000,
};
//# sourceMappingURL=jest.config.js.map