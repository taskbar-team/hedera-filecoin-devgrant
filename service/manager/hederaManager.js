const hedera = require('../config/hederaConfig')
const { FileCreateTransaction, Hbar, FileContentsQuery } = require("@hashgraph/sdk");

async function createFile(body) {
    const transaction = await new FileCreateTransaction()
        .setKeys([hedera.getPublicKey()])
        .setContents(body)
        .setMaxTransactionFee(new Hbar(2))
        .freezeWith(hedera.getClient());

    const signTx = await transaction.sign(hedera.getPrivateKey());

    const submitTx = await signTx.execute(hedera.getClient());

    const receipt = await submitTx.getReceipt(hedera.getClient());
    const newFileId = receipt.fileId;

    console.log("The new file ID is: " + newFileId);

    return newFileId.toString();
}

async function getFile(fileId) {
    const query = new FileContentsQuery()
        .setFileId(fileId);

    return await query.execute(hedera.getClient());
}

module.exports = { createFile, getFile }