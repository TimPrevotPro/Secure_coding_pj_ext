"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const fastify_2 = require("../../lib/fastify");
const chai = require("chai");
const assertsResponseSchemaPresenceHook_1 = require("../../hooks/assertsResponseSchemaPresenceHook");
const faker_1 = require("@faker-js/faker");
describe("hooks", function () {
    describe("assertsBodySchemaPresenceHook", function () {
        it("should validate that the hook drops the input and respond with a 400 HTTP error code when a route with no body schema is registered", async function () {
            const userPwd = faker_1.faker.internet.password();
            const request = {
                firstName: faker_1.faker.name.firstName(),
                lastName: faker_1.faker.name.lastName(),
                email: faker_1.faker.internet.email(),
                password: userPwd,
                passwordConfirmation: userPwd,
            };
            const response = await fastify_2.server.inject({
                url: `/web-api/users`,
                method: "POST",
                payload: request,
            });
            chai.assert(response.statusCode === 400);
        });
    });
    describe("assertsResponseSchemaPresenceHook", function () {
        it("should validate that the hook throws when a route with no response schema is registered", function () {
            const serverMock = (0, fastify_1.fastify)().addHook("onRoute", assertsResponseSchemaPresenceHook_1.assertsResponseSchemaPresenceHook);
            const route = {
                method: "GET",
                url: "/",
                handler: () => {
                    return "Hello World!";
                },
            };
            chai.assert.throws(() => serverMock.route(route), /Route GET \/ has no response schema/);
        });
    });
});
//# sourceMappingURL=hooks.spec.ts.map