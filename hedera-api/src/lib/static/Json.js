"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Json = void 0;
const tslib_1 = require("tslib");
const LiveJson_1 = require("../live/LiveJson");
const UploadableFile_1 = require("../UploadableFile");
class Json extends UploadableFile_1.UploadableFile {
    static isInfoAcceptable(jInfo) {
        try {
            Json._guardForInvalid(jInfo);
            return true;
        }
        catch (e) {
            // No-op
        }
        return false;
    }
    /**
     * @private
     */
    static _guardForInvalid(jInfo) {
        if (jInfo === null || typeof jInfo !== 'object') {
            throw new Error("Please provide a valid JSON object to instantiate a static Json with.");
        }
        else {
            const containsInvalidKeys = Object.keys(jInfo).find(jInfoKey => jInfoKey.length > 0 && (jInfoKey[0] === '_' || jInfoKey === 'id')) !== undefined;
            if (containsInvalidKeys) {
                throw new Error("Static Jsons can only be constructed from JSON objects whos properties dont't start with '_' or has the 'id' naming.");
            }
        }
    }
    constructor(jInfo) {
        Json._guardForInvalid(jInfo);
        super();
        this._info = jInfo;
    }
    /**
     * @override
     * @protected
     */
    _getContent() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return JSON.stringify(this._info);
        });
    }
    /**
     * @override
     * @protected
     */
    _onFileUploaded({ client, receipt, args = [] }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new LiveJson_1.LiveJson({
                client,
                id: receipt.fileId,
                data: this._info
            });
        });
    }
}
exports.Json = Json;
//# sourceMappingURL=Json.js.map