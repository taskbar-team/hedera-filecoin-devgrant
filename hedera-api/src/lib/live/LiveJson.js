"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveJson = void 0;
/**
 * Represents a Hedera, HFS-managed Json object
 *
 * TODO: add SDK methods to make this trully live
 */
class LiveJson {
    constructor({ client, id, data }) {
        this._client = client;
        this._id = id;
        // Dynamically bind jData properties to instance
        Object.keys(data).forEach(jDataKey => Object.defineProperty(this, jDataKey, {
            enumerable: true,
            value: data[jDataKey],
            writable: false,
        }));
    }
    get id() {
        return this._id;
    }
}
exports.LiveJson = LiveJson;
//# sourceMappingURL=LiveJson.js.map