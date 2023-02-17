"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertsBodySchemaPresenceHook = void 0;
function assertsBodySchemaPresenceHook(routeOptions) {
    var _a;
    if (!((_a = routeOptions.schema) === null || _a === void 0 ? void 0 : _a.body)) {
        routeOptions.handler = async (request, reply) => {
            await reply.code(400).send({ message: "Missing body schema" });
            return;
        };
    }
}
exports.assertsBodySchemaPresenceHook = assertsBodySchemaPresenceHook;
//# sourceMappingURL=assertsBodySchemaPresenceHook.js.map