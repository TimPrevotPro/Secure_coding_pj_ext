"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const users_1 = require("./web-api/users");
const routes = async (server) => {
    await server.register(users_1.userRoutes, { prefix: "/web-api" });
};
exports.routes = routes;
//# sourceMappingURL=routes.js.map