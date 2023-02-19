import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { ILike } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../lib/typeorm";

interface UniqueInColumnProps {
	caseSensitive?: boolean;
	targetColumn?: string;
}

export function UniqueInColumn(props?: UniqueInColumnProps, validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: "UniqueInColumn",
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				async validate(value: string, args: ValidationArguments) {
					const property = args.property;
					const propertyValue = value;
					const repository = AppDataSource.getRepository(User);

					return !(await repository.findOne({
						where: {
							[props?.targetColumn ?? property]: props?.caseSensitive
								? propertyValue
								: ILike(propertyValue),
						},
					}));
				},
			},
		});
	};
}
