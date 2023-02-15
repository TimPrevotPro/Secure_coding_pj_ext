import { RouteOptions } from "fastify";

export function assertsResponseSchemaPresenceHook(routeOptions: RouteOptions) {
	if (!routeOptions.schema?.response) {
		throw new Error(
			`Route ${routeOptions.method.toString()} ${routeOptions.url} has no response schema`
		);
	}
}
