import { AppDataSource } from "./lib/typeorm";
import { server } from "./lib/fastify";
import { FASTIFY_PORT, FASTIFY_ADDR } from "./lib/dotenv";

async function run() {
	await AppDataSource.initialize();
	await server.listen({ port: FASTIFY_PORT, host: FASTIFY_ADDR });
}
run().catch(console.error);
