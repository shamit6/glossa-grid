import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('Users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 64 }),
  password: varchar('password', { length: 64 }),
})

export const translations = pgTable('Translations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  fromLanguage: varchar('from_language', { length: 32 }).default('en').notNull(),
  toLanguage: varchar('to_language', { length: 32 }).default('he').notNull(),
  word: varchar('word', { length: 64 }).notNull(),
  translation: varchar('translated_word', { length: 64 }).notNull(),
  description: text('translated_word_description'),
  example: text('translated_word_example'),
  learningStatus: text('learning_status').$type<'new' | 'onLearning' | 'learned'>().default('new'),
  createdAt: timestamp("created_at").defaultNow(),
})