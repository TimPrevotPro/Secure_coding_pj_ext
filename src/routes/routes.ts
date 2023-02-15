import { FastifyPluginAsync } from "fastify";
import { userRoutes } from "./web-api/users";
export const routes: FastifyPluginAsync = async (server) => {
	await server.register(userRoutes, { prefix: "/web-api" });
};
