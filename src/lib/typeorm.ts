import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "../entities/user";
import { UserSubscriber } from "../subscriber/user-subscriber";

dotenv.config();

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DATABASE_HOST,
	port: parseInt(process.env.DATABASE_PORT || "5432", 10),
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DATABASE,
	synchronize: true,
	logging: false,
	entities: [User],
	migrations: [],
	subscribers: [UserSubscriber],
	uuidExtension: "uuid-ossp",
});
