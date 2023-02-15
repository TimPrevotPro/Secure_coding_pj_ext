import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Session {
	@PrimaryColumn({ length: 64 })
	token: string;

	@ManyToOne(() => User)
	user!: User;

	@CreateDateColumn()
	createdAt: Date;

	@Column()
	expiresAt: Date;

	@Column()
	revokedAt: Date;

	initialize() {}
}
