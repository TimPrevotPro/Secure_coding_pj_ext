import { fastify, RouteOptions } from "fastify";
import { server } from "../../lib/fastify";
import * as chai from "chai";
import { assertsResponseSchemaPresenceHook } from "../../hooks/assertsResponseSchemaPresenceHook";
import { faker } from "@faker-js/faker";
import { CreateUserRequestBody } from "../../schemas/types/CreateUserRequestBody";

describe("hooks", function () {
	describe("assertsBodySchemaPresenceHook", function () {
		it("should validate that the hook drops the input and respond with a 400 HTTP error code when a route with no body schema is registered", async function () {
			const userPwd = faker.internet.password();
			const request = {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
				password: userPwd,
				passwordConfirmation: userPwd,
			} as CreateUserRequestBody;
			const response = await server.inject({
				url: `/web-api/users`,
				method: "POST",
				payload: request,
			});
			chai.assert(response.statusCode === 400);
		});
	});

	describe("assertsResponseSchemaPresenceHook", function () {
		it("should validate that the hook throws when a route with no response schema is registered", function () {
			const serverMock = fastify().addHook("onRoute", assertsResponseSchemaPresenceHook);
			const route = {
				method: "GET",
				url: "/",
				handler: () => {
					return "Hello World!";
				},
			} as RouteOptions;

			chai.assert.throws(
				() => serverMock.route(route),
				/Route GET \/ has no response schema/
			);
		});
	});
});
