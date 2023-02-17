"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const ValidationError_1 = require("../ValidationError");
const bcrypt = require("bcrypt");
let User = class User extends typeorm_1.BaseEntity {
    calculateEntropy(password) {
        let r = 0;
        if (password.match(/[a-z]/))
            r += 26;
        if (password.match(/[A-Z]/))
            r += 26;
        if (password.match(/[0-9]/))
            r += 10;
        if (password.match(/[^a-zA-Z0-9]/))
            r += 33;
        return Math.log(Math.pow(r, password.length)) / Math.log(2);
    }
    async isPasswordValid(password) {
        return await bcrypt.compare(password, this.passwordHash);
    }
    async setPassword(password, confirmPassword) {
        if (password !== confirmPassword) {
            throw new ValidationError_1.ValidationError("password and confirmPassword must be the same", this, "passwordHash");
        }
        if (this.calculateEntropy(password) < 80) {
            throw new ValidationError_1.ValidationError("password is too weak", this, "passwordHash");
        }
        this.passwordHash = await bcrypt.hash(password, 10);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)({ message: "firstName should be a string" }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)({ message: "lastName should be a string" }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        transformer: {
            from(email) {
                return email.toLowerCase();
            },
            to(email) {
                return email;
            },
        },
    }),
    (0, typeorm_1.Index)({ unique: true }),
    (0, class_validator_1.IsNotEmpty)({ message: "email should not be empty" }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)({ message: "passwordHash should be a string" }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
async function validateUser(user) {
    const errors = await (0, class_validator_1.validate)(user);
    if (errors.length > 0) {
        console.log("ERRORS: ", errors);
        throw errors;
    }
}
exports.validateUser = validateUser;
//# sourceMappingURL=user.js.map