"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
async function errorHandler(error, request, reply) {
    console.error(error);
    if (error instanceof class_validator_1.ValidationError) {
        await reply.status(400).send({ error: "Validation Error" });
    }
    else if (error instanceof typeorm_1.EntityNotFoundError) {
        await reply.status(404).send({ error: "Not Found" });
    }
    else {
        await reply.status(500).send({ error: "An internal error occurred, please try again." });
    }
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map