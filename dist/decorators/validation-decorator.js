"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueInColumn = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const typeorm_2 = require("../lib/typeorm");
function UniqueInColumn(props, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "UniqueInColumn",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                async validate(value, args) {
                    var _a;
                    const property = args.property;
                    const propertyValue = value;
                    const repository = typeorm_2.AppDataSource.getRepository(user_1.User);
                    return !(await repository.findOne({
                        where: {
                            [(_a = props === null || props === void 0 ? void 0 : props.targetColumn) !== null && _a !== void 0 ? _a : property]: (props === null || props === void 0 ? void 0 : props.caseSensitive)
                                ? propertyValue
                                : (0, typeorm_1.ILike)(propertyValue),
                        },
                    }));
                },
            },
        });
    };
}
exports.UniqueInColumn = UniqueInColumn;
//# sourceMappingURL=validation-decorator.js.map