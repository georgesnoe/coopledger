import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	json,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	phoneNumber: text("phone_number").notNull().unique(),
	password: text("password").notNull(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	isWhatsappVerified: boolean("is_whatsapp_verified").default(false).notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	token: text("token").notNull().unique(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const whatsappVerification = pgTable("whatsapp_verification", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	code: text("code").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const cooperative = pgTable("cooperative", {
	id: text("id").primaryKey(),
	name: text("name").notNull().unique(),
	description: text("description"),
	founderId: text("founder_id")
		.notNull()
		.references(() => user.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const member = pgTable("member", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	cooperativeId: text("cooperative_id").references(() => cooperative.id, {
		onDelete: "cascade",
	}),
	role: text("role").default("member").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const vote = pgTable("vote", {
	id: text("id").primaryKey(),
	cooperativeId: text("cooperative_id")
		.notNull()
		.references(() => cooperative.id, { onDelete: "cascade" }),
	question: text("question").notNull(),
	options: json("options").$type<{ label: string }[]>().notNull(),
	startTime: timestamp("start_time").notNull(),
	endTime: timestamp("end_time").notNull(),
	status: text("status").default("pending").notNull(), // pending, active, finished
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const memberVote = pgTable("member_vote", {
	id: text("id").primaryKey(),
	voteId: text("vote_id")
		.notNull()
		.references(() => vote.id, { onDelete: "cascade" }),
	memberId: text("member_id")
		.notNull()
		.references(() => member.id, { onDelete: "cascade" }),
	optionIndex: text("option_index").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const wallet = pgTable("wallet", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.unique()
		.references(() => user.id, { onDelete: "cascade" }),
	balance: text("balance").default("0").notNull(), // Use text or numeric for precision
	currency: text("currency").default("FCFA").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const transaction = pgTable("transaction", {
	id: text("id").primaryKey(),
	walletId: text("wallet_id")
		.notNull()
		.references(() => wallet.id, { onDelete: "cascade" }),
	amount: text("amount").notNull(),
	type: text("type").notNull(), // deposit, withdrawal, payment, vote_reward
	description: text("description"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	memberships: many(member),
	foundedCooperatives: many(cooperative),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const cooperativeRelations = relations(cooperative, ({ one, many }) => ({
	founder: one(user, {
		fields: [cooperative.founderId],
		references: [user.id],
	}),
	members: many(member),
}));

export const memberRelations = relations(member, ({ one }) => ({
	user: one(user, {
		fields: [member.userId],
		references: [user.id],
	}),
	cooperative: one(cooperative, {
		fields: [member.cooperativeId],
		references: [cooperative.id],
	}),
}));

export const walletRelations = relations(wallet, ({ one }) => ({
	user: one(user, {
		fields: [wallet.userId],
		references: [user.id],
	}),
}));

export const transactionRelations = relations(transaction, ({ one }) => ({
	wallet: one(wallet, {
		fields: [transaction.walletId],
		references: [wallet.id],
	}),
}));
