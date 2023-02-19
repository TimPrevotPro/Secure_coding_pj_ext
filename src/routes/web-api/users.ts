import { FastifyPluginCallback } from "fastify";
import { User } from "../../entities/User";
import { CreateUserRequestBody as ICreateUserRequestBody } from "../../schemas/types/CreateUserRequestBody";
import { CreateUserResponseBody } from "../../schemas/types/CreateUserResponseBody";
import * as bcrypt from "bcrypt";
import { AppDataSource } from "../../lib/typeorm";

export const userRoutes: FastifyPluginCallback = (server, options, done) => {
	server.post<{
		Body: ICreateUserRequestBody;
		Reply: CreateUserResponseBody;
	}>(
		"/users",
		{
			preValidation: (request, reply, done) => {
				const { password, passwordConfirmation } = request.body;
				done(
					password != passwordConfirmation
						? new Error("Must have same password")
						: undefined
				);
			},
		},
		async (request, reply) => {
			const { firstName, lastName, email, password } = request.body;
			const repo = AppDataSource.manager.getRepository(User);
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
		}
	);
	done();
};
