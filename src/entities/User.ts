import { Entity, PrimaryGeneratedColumn, Column, Index, BaseEntity } from "typeorm";
import { IsEmail, IsNotEmpty, IsString, validate } from "class-validator";
import { ValidationError } from "../ValidationError";
import * as bcrypt from "bcrypt";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	@IsString({ message: "firstName should be a string" })
	firstName: string;

	@Column()
	@IsString({ message: "lastName should be a string" })
	lastName: string;

	@Column({
		unique: true,
		transformer: {
			from(email: string) {
				return email.toLowerCase();
			},
			to(email: string) {
				return email;
			},
		},
	})
	@Index({ unique: true })
	@IsNotEmpty({ message: "email should not be empty" })
	@IsEmail()
	email: string;

	@Column()
	@IsString({ message: "passwordHash should be a string" })
	passwordHash: string;

	calculateEntropy(password: string) {
		let r = 0;
		if (password.match(/[a-z]/)) r += 26;
		if (password.match(/[A-Z]/)) r += 26;
		if (password.match(/[0-9]/)) r += 10;
		if (password.match(/[^a-zA-Z0-9]/)) r += 33;
		return Math.log(Math.pow(r, password.length)) / Math.log(2);
	}

	async isPasswordValid(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this.passwordHash);
	}

	async setPassword(password: string, confirmPassword: string) {
		if (password !== confirmPassword) {
			throw new ValidationError(
				"password and confirmPassword must be the same",
				this,
				"passwordHash"
			);
		}
		if (this.calculateEntropy(password) < 80) {
			throw new ValidationError("password is too weak", this, "passwordHash");
		}
		this.passwordHash = await bcrypt.hash(password, 10);
	}
}

export async function validateUser(user: User) {
	const errors = await validate(user);
	if (errors.length > 0) {
		console.log("ERRORS: ", errors);
		throw errors;
	}
}
