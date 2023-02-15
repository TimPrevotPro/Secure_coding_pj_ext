import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";

export function assertsQuerySchemaPresenceHook(routeOptions: RouteOptions) {
	if (!routeOptions.schema?.querystring) {
		routeOptions.handler = async (request: FastifyRequest, reply: FastifyReply) => {
			await reply.code(400).send({ message: "Missing query schema" });
			return;
		};
	}
}
