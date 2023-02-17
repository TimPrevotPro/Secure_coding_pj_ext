"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const user_1 = require("../entities/user");
const user_subscriber_1 = require("../subscriber/user-subscriber");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "5432", 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    synchronize: true,
    logging: false,
    entities: [user_1.User],
    migrations: [],
    subscribers: [user_subscriber_1.UserSubscriber],
    uuidExtension: "uuid-ossp",
});
//# sourceMappingURL=typeorm.js.map