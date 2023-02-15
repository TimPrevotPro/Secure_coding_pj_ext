import { User } from "./entities/user";

export class ValidationError extends Error {
	target: User;
	property: string;

	constructor(message: string, user: User, property: string) {
		super(message);
		this.target = user;
		this.property = property;
	}
}
