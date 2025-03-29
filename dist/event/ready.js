"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReady = handleReady;
function handleReady(client) {
    var _a;
    console.log(`Connecté en tant que ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
}
