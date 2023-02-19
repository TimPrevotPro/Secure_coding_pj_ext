// src/specs/entities/user.ts
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { faker } from "@faker-js/faker";
import { AppDataSource } from "../../lib/typeorm";
import { User } from "../../entities/user";
import { QueryFailedError } from "typeorm/error/QueryFailedError";
import { ValidationError } from "../../ValidationError";

chai.use(chaiAsPromised);

describe("User", function () {
	before(async function () {
		await AppDataSource.initialize();
	});

	beforeEach(async function () {
		await AppDataSource.manager.clear(User);
	});

	describe("validations", function () {
		it("should create a new User in database", async function () {
			const repo = AppDataSource.manager.getRepository(User);
			const user = repo.create({
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
				passwordHash: faker.internet.password(),
			});
			await repo.save(user);

			chai.expect(user).to.haveOwnProperty("id").and.be.a.ok("number");
		});

		it("should raise error if email is missing", async function () {
			const repo = AppDataSource.manager.getRepository(User);
			const user = repo.create({
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				passwordHash: faker.internet.password(),
			});

			await chai.expect(repo.save(user)).to.eventually.be.rejected.and.deep.include({
				target: user,
				value: undefined,
				property: "email",
				children: [],
				constraints: { isEmail: 'email must be an email', isNotEmpty: "email should not be empty" },
			});
		});

		//TODO fix this test: AssertionError: expected promise to be rejected with 'QueryFailedError' but it was fulfilled with QueryFailedError: duplicate key value vio… { …(18) }
		it("Should validate uniqueness of email ignoring case at db level", async function () {
			const repo = AppDataSource.manager.getRepository(User);
			const user1 = repo.create({
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
				passwordHash: faker.internet.password(),
			});

			await repo.save(user1);

			const user2 = repo.create({
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: user1.email,
				passwordHash: faker.internet.password(),
			});

			await chai
				.expect(repo.save(user2))
				.to.eventually.be.rejected.and.rejectedWith(
					QueryFailedError,
					'duplicate key value violates unique constraint on "user_email" '
				);
		});

		it("should raise error if password !== confirmPassword", async function () {
			// Create a new user
			const user = User.create({
				firstName: "Chloe",
				lastName: "Stephan",
				email: "chloe.stephan@efrei.net",
			});
			const promise = user.setPassword("%v0ll3y%", ":yyyy:");
			// Check if it raises an error
			await chai
				.expect(promise)
				.to.eventually.be.rejectedWith(
					ValidationError,
					"password and confirmPassword must be the same"
				)
				.and.include({ target: user, property: "passwordHash" });
		});

		it("should raise error if password is too weak", async function () {
			// Create a new user
			const user = User.create({
				firstName: "Chloe",
				lastName: "Stephan",
				email: "chloe.stephan@efrei.net",
			});
			const promise = user.setPassword(":yyyy:", ":yyyy:");
			// Check if it raises an error
			await chai
				.expect(promise)
				.to.eventually.be.rejectedWith(ValidationError, "password is too weak")
				.and.include({ target: user, property: "passwordHash" });
		});
	});
});
