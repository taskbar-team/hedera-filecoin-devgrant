const { Client, PublicKey, PrivateKey } = require("@hashgraph/sdk");

const publicKey = PublicKey.fromString(process.env.HEDERA_PUBLIC_KEY)
const privateKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY)
const operatorAccount = process.env.HEDERA_ACCOUNT_ID;

class HederaConfig {
    constructor() {
        console.log("Connecting to the Hedera Testnet");
        this.client = Client.forTestnet();
        this.client.setOperator(operatorAccount, privateKey);
    }

    getPublicKey() {
        return publicKey;
    }

    getPrivateKey() {
        return privateKey;
    }

    getClient() {
        return this.client;
    }

}

var hederaConfig = new HederaConfig();
module.exports = hederaConfig;