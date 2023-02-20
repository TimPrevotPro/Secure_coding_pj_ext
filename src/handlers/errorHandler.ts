import { FastifyRequest, FastifyReply } from "fastify";
import { ValidationError } from "class-validator";
import { EntityNotFoundError } from "typeorm";
import { logger } from "../utils/logger";

export async function errorHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
	logger.error(error);

	// First case can't trigger because the ValidationError from class-validator doesn't implement the Error interface
	// I could've made a custom ValidationPipe to handle this if we were using express, but it's not possible on Fastify :)
	if (error instanceof ValidationError) {
		await reply.status(400).send({ error: "Validation Error" });
	} else if (error instanceof EntityNotFoundError) {
		await reply.status(404).send({ error: "Not Found" });
	} else {
		await reply.status(500).send({ error: "An internal error occurred, please try again." });
	}
}
