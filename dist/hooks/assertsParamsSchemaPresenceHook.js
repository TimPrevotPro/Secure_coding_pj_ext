"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertsParamsSchemaPresenceHook = void 0;
function assertsParamsSchemaPresenceHook(routeOptions) {
    var _a;
    if (!((_a = routeOptions.schema) === null || _a === void 0 ? void 0 : _a.params)) {
        routeOptions.handler = async (request, reply) => {
            await reply.code(400).send({ message: "Missing params schema" });
            return;
        };
    }
}
exports.assertsParamsSchemaPresenceHook = assertsParamsSchemaPresenceHook;
//# sourceMappingURL=assertsParamsSchemaPresenceHook.js.map