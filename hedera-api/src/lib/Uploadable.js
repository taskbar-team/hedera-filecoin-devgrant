"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uploadable = void 0;
const tslib_1 = require("tslib");
const sdk_1 = require("@hashgraph/sdk");
// Note: This follows the @hashgraph/sdk/lib/transaction/Transaction > CHUNK_SIZE value
const FILE_CHUNK_SIZE = 1024;
class Uploadable {
    /**
     * Uploads this Uploadable to the desired client passing in arguments if provided.
     *
     * @param {Array} args - A list of arguments to use and/or pass along. If the first object contains a '_file' property, it's assumed that its content contains
     *                       FileCreateTransaction constructor arguments and is embedded in the transaction being created. It then goes on to discard that initial
     *                       value before passing the remaining arguments along to the _onFileUploaded implementation.
     * @public
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    uploadTo({ client, args = [] }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (client instanceof sdk_1.Client === false) {
                throw new Error("In order to upload something to Hedera, we would need a valid Client instance provided.");
            }
            const whatToUpload = yield this._getContent();
            const { areOverridesProvided, fileTransactions } = yield this._getFileTransactionsFor({ content: whatToUpload, client, args });
            const transactionResponse = yield fileTransactions[0].execute(client);
            const transactionReceipt = yield transactionResponse.getReceipt(client);
            if (transactionReceipt.status !== sdk_1.Status.Success) {
                throw new Error(`There was an issue while creating the file (status ${transactionReceipt.status}). Aborting file upload.`);
            }
            else if (fileTransactions.length > 1) {
                // We update the upcoming file-append transaction request to reference the fileId
                yield fileTransactions[1].setFileId(transactionReceipt.fileId)
                    .executeAll(client);
            }
            if (areOverridesProvided) {
                args = args.slice(1);
            }
            return this._onFileUploaded({
                client,
                receipt: transactionReceipt,
                args
            });
        });
    }
    /**
     * @protected
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _onFileUploaded({ client, receipt, args = [] }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return receipt;
        });
    }
    /**
     * @abstract
     * @returns {Uint8Array | string}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _getContent() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error("Uploadable.getContent has not been implemented yet.");
        });
    }
    /**
     * @private
     */
    _getFileTransactionsFor({ content, client, args = [] }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fileTransactions = [];
            let fileCreationOverrides = {};
            // If available, lock onto any file-creation arguments to embedd when constructing the initial transaction
            if (args.length > 0 && Object.keys(args[0]).length !== 0 && Object.keys(args[0])[0] === '_file') {
                fileCreationOverrides = args[0]._file;
            }
            // Start off with a file-create transaction
            fileTransactions.push(new sdk_1.FileCreateTransaction(Object.assign({}, Object.assign({ keys: [client.operatorPublicKey] }, fileCreationOverrides), { contents: content.length > FILE_CHUNK_SIZE ? content.slice(0, FILE_CHUNK_SIZE) : content })));
            // Add, if necessary, other file-append transactions to consume the rest of the chunks
            if (content.length > FILE_CHUNK_SIZE) {
                const contentToAppend = content.slice(FILE_CHUNK_SIZE);
                fileTransactions.push(new sdk_1.FileAppendTransaction({
                    contents: contentToAppend,
                    maxChunks: Math.ceil(contentToAppend.length / FILE_CHUNK_SIZE)
                }));
            }
            return {
                areOverridesProvided: Object.keys(fileCreationOverrides).length !== 0,
                fileTransactions
            };
        });
    }
}
exports.Uploadable = Uploadable;
//# sourceMappingURL=Uploadable.js.map