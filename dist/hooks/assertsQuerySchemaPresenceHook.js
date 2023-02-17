"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertsQuerySchemaPresenceHook = void 0;
function assertsQuerySchemaPresenceHook(routeOptions) {
    var _a;
    if (!((_a = routeOptions.schema) === null || _a === void 0 ? void 0 : _a.querystring)) {
        routeOptions.handler = async (request, reply) => {
            await reply.code(400).send({ message: "Missing query schema" });
            return;
        };
    }
}
exports.assertsQuerySchemaPresenceHook = assertsQuerySchemaPresenceHook;
//# sourceMappingURL=assertsQuerySchemaPresenceHook.js.map