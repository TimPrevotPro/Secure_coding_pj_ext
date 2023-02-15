import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";

export function assertsParamsSchemaPresenceHook(routeOptions: RouteOptions) {
	if (!routeOptions.schema?.params) {
		routeOptions.handler = async (request: FastifyRequest, reply: FastifyReply) => {
			await reply.code(400).send({ message: "Missing params schema" });
			return;
		};
	}
}
