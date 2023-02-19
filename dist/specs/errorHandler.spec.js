"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const faker_1 = require("@faker-js/faker");
const fastify_1 = require("../lib/fastify");
describe("handlers", function () {
    describe("errorHandler", function () {
        it("should validate that the handler returns a 400 status code when the request triggers a validation error", async function () {
            const pwd = faker_1.faker.internet.password();
            const userRequest = {
                firstName: faker_1.faker.name.firstName(),
                lastName: faker_1.faker.name.lastName(),
                email: faker_1.faker.internet.email(),
                password: pwd,
                confirmPassword: pwd,
            };
            const response = await fastify_1.server.inject({
                url: `/web-api/users`,
                method: "POST",
                payload: userRequest,
            });
            chai.expect(response.body).to.have.property("statusCode", 400);
        });
    });
});
//# sourceMappingURL=errorHandler.spec.ts.map