"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.read = void 0;
const fs = require("fs");
const path = require("path");
function read({ contract, solo }) {
    if (undefined != contract) {
        return fs.readFileSync(path.join(__dirname, 'resources/contracts/sources', `${contract}.sol`), 'utf8');
    }
    else {
        return require(`./resources/contracts/solos/${solo}.json`);
    }
}
exports.read = read;
//# sourceMappingURL=utils.js.map