import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  img: varchar('img', { length: 255 }),
  roles: text('roles').array().notNull().default(['USER_ROLE']),
});

export type UserTableSelect = typeof usersTable.$inferSelect;
export type UserTableInsert = typeof usersTable.$inferInsert;
