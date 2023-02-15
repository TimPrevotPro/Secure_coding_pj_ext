import { FastifyRequest, FastifyReply } from "fastify";
import { ValidationError } from "class-validator";
import { EntityNotFoundError } from "typeorm";

export async function errorHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
	console.error(error);

	if (error instanceof ValidationError) {
		await reply.status(400).send({ error: "Validation Error" });
	} else if (error instanceof EntityNotFoundError) {
		await reply.status(404).send({ error: "Not Found" });
	} else {
		await reply.status(500).send({ error: "An internal error occurred, please try again." });
	}
}
