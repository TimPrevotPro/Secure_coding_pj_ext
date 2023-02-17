"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const faker_1 = require("@faker-js/faker");
const fastify_1 = require("../../lib/fastify");
describe("/web-api/users", function () {
    describe("POST #create", function () {
        it("should register the user", async function () {
            const userPwd = faker_1.faker.internet.password();
            const userRequest = {
                firstName: faker_1.faker.name.firstName(),
                lastName: faker_1.faker.name.lastName(),
                email: faker_1.faker.internet.email(),
                password: userPwd,
                passwordConfirmation: userPwd,
            };
            const response = await fastify_1.server.inject({
                url: `/web-api/users`,
                method: "POST",
                payload: userRequest,
            });
            chai.expect(response.statusCode).to.equal(201);
        });
    });
});
//# sourceMappingURL=web-api.spec.js.map