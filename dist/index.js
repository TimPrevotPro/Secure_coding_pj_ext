"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("./lib/typeorm");
const fastify_1 = require("./lib/fastify");
const dotenv_1 = require("./lib/dotenv");
async function run() {
    await typeorm_1.AppDataSource.initialize();
    await fastify_1.server.listen({ port: dotenv_1.FASTIFY_PORT, host: dotenv_1.FASTIFY_ADDR });
}
run().catch(console.error);
//# sourceMappingURL=index.js.map