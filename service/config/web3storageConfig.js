
const { Web3Storage } = require('web3.storage');

const token = process.env.FILECOIN_TOKEN;

class Web3storageConfig {
    constructor() {
        this.storage = new Web3Storage({ token })
    }

    getClient() {
        return this.storage;
    }

}

var web3StorageConfig = new Web3storageConfig();
module.exports = web3StorageConfig;