import { FastifyRequest, FastifyReply, RouteOptions } from "fastify";

export function assertsBodySchemaPresenceHook(routeOptions: RouteOptions) {
	if (!routeOptions.schema?.body) {
		routeOptions.handler = async (request: FastifyRequest, reply: FastifyReply) => {
			await reply.code(400).send({ message: "Missing body schema" });
			return;
		};
	}
}
