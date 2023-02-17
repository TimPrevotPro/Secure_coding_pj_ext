"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertsResponseSchemaPresenceHook = void 0;
function assertsResponseSchemaPresenceHook(routeOptions) {
    var _a;
    if (!((_a = routeOptions.schema) === null || _a === void 0 ? void 0 : _a.response)) {
        throw new Error(`Route ${routeOptions.method.toString()} ${routeOptions.url} has no response schema`);
    }
}
exports.assertsResponseSchemaPresenceHook = assertsResponseSchemaPresenceHook;
//# sourceMappingURL=assertsResponseSchemaPresenceHook.js.map