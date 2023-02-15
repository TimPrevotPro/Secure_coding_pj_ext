import * as chai from "chai";
import { faker } from "@faker-js/faker";
import { server } from "../lib/fastify";

describe("handlers", function () {
	describe("errorHandler", function () {
		it("should validate that the handler returns a 400 status code when the request triggers a validation error", async function () {
			const pwd = faker.internet.password();
			const userRequest = {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
				password: pwd,
				confirmPassword: pwd,
			};

			const response = await server.inject({
				url: `/web-api/users`,
				method: "POST",
				payload: userRequest,
			});

			chai.expect(response.body).to.have.property("statusCode", 400);
		});
	});
});
