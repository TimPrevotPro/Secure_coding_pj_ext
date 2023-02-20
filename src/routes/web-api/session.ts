import { FastifyPluginCallback } from "fastify";
import { User } from "../../entities/User";
const bcrypt = require('bcrypt');
import { AppDataSource } from "../../lib/typeorm";
import { CreateSessionRequestBody as ICreateSessionRequestBody } from "../../schemas/types/CreateSessionRequestBody ";
import {CreateUserResponseBody} from "../../schemas/types/CreateUserResponseBody";

export const sessionRoutes: FastifyPluginCallback = (server, options, done) => {
    server.post<{
        Body: ICreateSessionRequestBody;
        Reply: CreateUserResponseBody;
    }>(
        "/session",
        {

        }
    );
    done();
};
