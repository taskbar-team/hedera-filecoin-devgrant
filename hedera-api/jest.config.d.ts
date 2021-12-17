export const displayName: string;
export const preset: string;
export const globals: {
    'ts-jest': {
        tsconfig: string;
    };
};
export const transform: {
    '^.+\\.[tj]sx?$': string;
};
export const moduleFileExtensions: string[];
export const coverageDirectory: string;
export const setupFiles: string[];
export const testEnvironment: string;
export const testTimeout: number;
