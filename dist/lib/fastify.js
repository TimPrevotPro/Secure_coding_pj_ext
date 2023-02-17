"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const fastify_1 = require("fastify");
const routes_1 = require("../routes/routes");
const assertsBodySchemaPresenceHook_1 = require("../hooks/assertsBodySchemaPresenceHook");
const assertsParamsSchemaPresenceHook_1 = require("../hooks/assertsParamsSchemaPresenceHook");
const assertsQuerySchemaPresenceHook_1 = require("../hooks/assertsQuerySchemaPresenceHook");
const assertsResponseSchemaPresenceHook_1 = require("../hooks/assertsResponseSchemaPresenceHook");
const errorHandler_1 = require("../handlers/errorHandler");
exports.server = (0, fastify_1.default)({
    ajv: {
        customOptions: {
            removeAdditional: false,
        },
    },
});
async function run() {
    await exports.server.register(routes_1.routes);
    exports.server.addHook("onRoute", assertsBodySchemaPresenceHook_1.assertsBodySchemaPresenceHook);
    exports.server.addHook("onRoute", assertsParamsSchemaPresenceHook_1.assertsParamsSchemaPresenceHook);
    exports.server.addHook("onRoute", assertsQuerySchemaPresenceHook_1.assertsQuerySchemaPresenceHook);
    exports.server.addHook("onRoute", assertsResponseSchemaPresenceHook_1.assertsResponseSchemaPresenceHook);
    exports.server.setErrorHandler(errorHandler_1.errorHandler);
}
run().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=fastify.js.map