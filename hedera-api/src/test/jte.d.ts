export = JestTestEnvironment;
declare class JestTestEnvironment extends NodeEnvironment {
    constructor(config: any);
    handleTestEvent(ev: any): Promise<void>;
}
import NodeEnvironment = require("jest-environment-node");
