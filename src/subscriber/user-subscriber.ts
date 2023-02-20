import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { logger } from "../utils/logger";
import { User, validateUser } from "../entities/User";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
	listenTo() {
		return User;
	}

	async beforeInsert(event: InsertEvent<User>) {
		logger.info("BEFORE USER INSERTED: ", event.entity);
		await validateUser(event.entity);
	}

	async beforeUpdate(event: UpdateEvent<User>) {
		if (!event.entity) throw new Error("No entity found");
		logger.info("BEFORE USER UPDATED: ", event.databaseEntity);
		await validateUser(event.databaseEntity);
	}
}
