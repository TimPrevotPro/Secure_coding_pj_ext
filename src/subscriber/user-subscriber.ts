import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { User, validateUser } from "../entities/User";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
	listenTo() {
		return User;
	}

	async beforeInsert(event: InsertEvent<User>) {
		console.log("BEFORE USER INSERTED: ", event.entity);
		await validateUser(event.entity);
	}

	async beforeUpdate(event: UpdateEvent<User>) {
		if (!event.entity) throw new Error("No entity found");
		console.log("BEFORE USER UPDATED: ", event.databaseEntity);
		await validateUser(event.databaseEntity);
	}
}
