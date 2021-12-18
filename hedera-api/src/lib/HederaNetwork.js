"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HederaNetwork = exports.HEDERA_CUSTOM_NET_NAME = void 0;
const tslib_1 = require("tslib");
const sdk_1 = require("@hashgraph/sdk");
const process = require("process");
const CredentialsInvalidError_1 = require("./errors/CredentialsInvalidError");
const EnvironmentInvalidError_1 = require("./errors/EnvironmentInvalidError");
const ApiSession_1 = require("./ApiSession");
exports.HEDERA_CUSTOM_NET_NAME = "customnet";
class HederaNetwork {
    /**
     * @private
     */
    constructor(client) {
        this._apiSessions = {};
        this._client = client;
    }
    /**
     * @returns {Promise<ApiSession>}
     */
    static defaultApiSession(env = process.env) {
        return HederaNetwork.for({
            name: env.HEDERA_NETWORK,
            nodes: HederaNetwork._parseNetworkNodeFrom(env.HEDERA_NODES)
        }).login({
            operatorId: env.HEDERA_OPERATOR_ID,
            operatorkey: env.HEDERA_OPERATOR_KEY,
        });
    }
    /**
     * Builds a HederaNetwork link which can be later used to create api-sessions.
     *
     * @param {object} options
     * @param {string} options.name - The name of the network to target. Can be any of the following: mainnet, testnet, previewnet or customnet
     * @param {object} options.nodes - The 'Client.forNetwork' compatible method argument which consists of properties that are node lacations mapped to account Ids.
     *                                 Ex. { '127.0.0.1:50211': new AccountId(3), '127.0.0.1:50212': new AccountId(4) }
     *                                 Required if {@param options.name} is customnet otherwise it's optional.
     * @returns a {@see HederaNetwork} instance
     */
    static for({ name, nodes = {} }) {
        let chosenClient = null;
        const availableNetworkNames = [exports.HEDERA_CUSTOM_NET_NAME, "mainnet", "testnet", "previewnet"];
        if (!availableNetworkNames.includes(name)) {
            throw new EnvironmentInvalidError_1.EnvironmentInvalidError(`There is no such '${name}' network available. In order to continue, please choose a valid name from: ${availableNetworkNames.join(', ')}`);
        }
        try {
            chosenClient = sdk_1.Client.forName(name);
        }
        catch (e) {
            // This is a non-standard client. Maybe it's a local-net one?
            if (exports.HEDERA_CUSTOM_NET_NAME === name) {
                if (!nodes || Object.keys(nodes).length === 0) {
                    throw new EnvironmentInvalidError_1.EnvironmentInvalidError(`Please provide a list of network nodes in order to use a ${name} network.`);
                }
                chosenClient = sdk_1.Client.forNetwork(nodes);
            }
            else {
                // Note: this should never happen, but still ... better play it safe
                throw new EnvironmentInvalidError_1.EnvironmentInvalidError(`There is no such ${name} network available in this library. Available network names to choose from are: ${availableNetworkNames.join(', ')}`);
            }
        }
        return new HederaNetwork(chosenClient);
    }
    /**
     * Parses the provided string and constructs the hedera-network nodes object required to initialize a custom Hedera Client.
     * The expected {@param string} format is in the following form: <ip>:<port>#<account-id>[,<ip2>:<port2>#<account-id2>...]
     * Example: 127.0.0.1:50211#2,127.0.0.1:50212:#5 would get mapped to the following object:
     * {
     *   "127.0.0.1:50211": new AccountId(2),
     *   "127.0.0.1:50212": new AccountId(5)
     * }
     * @param {string} string
     * @returns
     */
    static _parseNetworkNodeFrom(string) {
        let networkInfo = {};
        if (string) {
            const nodeEntries = string.split(/\s*,\s*/);
            const nodeDefinitions = nodeEntries.map(entry => {
                if (entry.indexOf("#") === -1) {
                    throw new EnvironmentInvalidError_1.EnvironmentInvalidError(`Node definition entry '${entry}' is missing the account-id separator (#)`);
                }
                const [address, rawAccountNr] = entry.split("#");
                const accountNr = parseInt(rawAccountNr);
                return { [address]: new sdk_1.AccountId(accountNr) };
            });
            for (const rnEntry of nodeDefinitions) {
                const nodeAddress = Object.keys(rnEntry)[0];
                networkInfo[nodeAddress] = rnEntry[nodeAddress];
            }
        }
        return networkInfo;
    }
    static validateOperator({ id, key }) {
        let accountId;
        let privateKey;
        try {
            accountId = sdk_1.AccountId.fromString(id);
        }
        catch (_a) {
            throw new CredentialsInvalidError_1.CredentialsInvalidError("The provided operatorId is either invalid or missing.");
        }
        try {
            privateKey = sdk_1.PrivateKey.fromString(key);
        }
        catch (_b) {
            throw new CredentialsInvalidError_1.CredentialsInvalidError("The provided operatorKey is either invalid or missing.");
        }
        return { accountId, privateKey };
    }
    get client() {
        return this._client;
    }
    login({ operatorId, operatorkey }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // TODO: validate parameters
            if (!this._apiSessions[operatorId]) {
                const { accountId, privateKey } = HederaNetwork.validateOperator({
                    id: operatorId,
                    key: operatorkey
                });
                const hClient = this._client.setOperator(accountId, privateKey);
                const accountInfoQuery = new sdk_1.AccountInfoQuery().setAccountId(accountId);
                const accountInfo = yield accountInfoQuery.execute(hClient);
                // TODO: check accountInfo response
                //       see https://docs.hedera.com/guides/docs/sdks/cryptocurrency/get-account-info
                this._apiSessions[operatorId] = new ApiSession_1.ApiSession({ hClient, operatorInfo: accountInfo });
            }
            return this._apiSessions[operatorId];
        });
    }
}
exports.HederaNetwork = HederaNetwork;
//# sourceMappingURL=HederaNetwork.js.map