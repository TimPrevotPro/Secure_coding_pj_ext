import fastify from "fastify";
import { routes } from "../routes/routes";
import { assertsBodySchemaPresenceHook } from "../hooks/assertsBodySchemaPresenceHook";
import { assertsParamsSchemaPresenceHook } from "../hooks/assertsParamsSchemaPresenceHook";
import { assertsQuerySchemaPresenceHook } from "../hooks/assertsQuerySchemaPresenceHook";
import { assertsResponseSchemaPresenceHook } from "../hooks/assertsResponseSchemaPresenceHook";
import { errorHandler } from "../handlers/errorHandler";
import { logger } from "../utils/logger";

export const server = fastify({
	ajv: {
		customOptions: {
			removeAdditional: false,
		},
	},
});

async function run() {
	await server.register(routes);
	server.addHook("onRoute", assertsBodySchemaPresenceHook);
	server.addHook("onRoute", assertsParamsSchemaPresenceHook);
	server.addHook("onRoute", assertsQuerySchemaPresenceHook);
	server.addHook("onRoute", assertsResponseSchemaPresenceHook);
	server.setErrorHandler(errorHandler);
}

run().catch((err) => {
	logger.error(err);
});
