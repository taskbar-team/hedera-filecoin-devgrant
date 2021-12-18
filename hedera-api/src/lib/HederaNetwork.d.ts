export const HEDERA_CUSTOM_NET_NAME: "customnet";
export class HederaNetwork {
    /**
     * @returns {Promise<ApiSession>}
     */
    static defaultApiSession(env?: NodeJS.ProcessEnv): Promise<ApiSession>;
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
    static for({ name, nodes }: {
        name: string;
        nodes: object;
    }): HederaNetwork;
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
    static _parseNetworkNodeFrom(string: string): {};
    static validateOperator({ id, key }: {
        id: any;
        key: any;
    }): {
        accountId: AccountId;
        privateKey: PrivateKey;
    };
    /**
     * @private
     */
    private constructor();
    _apiSessions: {};
    _client: any;
    get client(): any;
    login({ operatorId, operatorkey }: {
        operatorId: any;
        operatorkey: any;
    }): Promise<any>;
}
import { ApiSession } from "./ApiSession";
import { AccountId } from "@hashgraph/sdk/lib/exports";
import { PrivateKey } from "@hashgraph/cryptography";
