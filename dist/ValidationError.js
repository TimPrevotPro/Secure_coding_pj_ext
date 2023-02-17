"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message, user, property) {
        super(message);
        this.target = user;
        this.property = property;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map