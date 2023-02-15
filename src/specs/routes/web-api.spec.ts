import * as chai from "chai";
import { faker } from "@faker-js/faker";
import { server } from "../../lib/fastify";
import { CreateUserRequestBody } from "../../schemas/types/CreateUserRequestBody";

describe("/web-api/users", function () {
	describe("POST #create", function () {
		it("should register the user", async function () {
			const userPwd = faker.internet.password();
			const userRequest: CreateUserRequestBody = {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
				password: userPwd,
				passwordConfirmation: userPwd,
			};

			const response = await server.inject({
				url: `/web-api/users`,
				method: "POST",
				payload: userRequest,
			});
			chai.expect(response.statusCode).to.equal(201);
		});
	});
});
