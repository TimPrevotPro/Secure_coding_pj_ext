"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_1 = require("../../entities/user");
const bcrypt = require("bcrypt");
const typeorm_1 = require("../../lib/typeorm");
const userRoutes = (server, options, done) => {
    server.post("/users", {
        preValidation: (request, reply, done) => {
            const { password, passwordConfirmation } = request.body;
            done(password != passwordConfirmation
                ? new Error("Must have same password")
                : undefined);
        },
    }, async (request, reply) => {
        const { firstName, lastName, email, password } = request.body;
        const repo = typeorm_1.AppDataSource.manager.getRepository(user_1.User);
        const user = repo.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            passwordHash: await bcrypt.hash(password, 10),
        });
        await repo.save(user);
        const resBody = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
        return reply.code(201).send(resBody);
    });
    done();
};
exports.userRoutes = userRoutes;
//# sourceMappingURL=users.js.map