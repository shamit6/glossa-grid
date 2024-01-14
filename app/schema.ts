import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('Users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 64 }),
  password: varchar('password', { length: 64 }),
})

export const translations = pgTable('Translations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  originalLanguage: varchar('original_language', { length: 32 }).default('en'),
  translatedLanguage: varchar('translated_language', { length: 32 }).default('he'),
  originalWord: varchar('original_word', { length: 64 }),
  translatedWord: varchar('translated_word', { length: 64 }),
  description: text('translated_word_description'),
  example: text('translated_word_example'),
  learningStatus: text('learning_status').$type<'new' | 'onProgress' | 'learned'>(),
  createdAt: timestamp("created_at").defaultNow(),
})