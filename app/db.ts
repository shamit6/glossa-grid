import { drizzle } from 'drizzle-orm/postgres-js'
import { and, eq } from 'drizzle-orm'
import postgres from 'postgres'
import { genSaltSync, hashSync } from 'bcrypt-ts'
import { users, translations } from './schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import type { LearningStatus } from './types'

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`)
let db = drizzle(client)

export async function getUser(email: string) {
  return await db.select().from(users).where(eq(users.email, email))
}

export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10)
  let hash = hashSync(password, salt)

  return await db.insert(users).values({ email, password: hash })
}

const insertTranslationSchema = createInsertSchema(translations)
const selectTranslationSchema = createSelectSchema(translations)

export type Translation = z.infer<typeof selectTranslationSchema>

export function getTranslations(userId: number): Promise<Translation[]> {
  return db.select().from(translations).where(eq(translations.userId, userId))
}

export function createTranslation({
  userId,
  word,
  translation,
  description,
  example,
}: z.infer<typeof insertTranslationSchema>) {
  return db
    .insert(translations)
    .values({ userId, word, translation, description, example })
    .returning()
}

export function deleteTranslation(translationId: number, userId: number) {
  return db
    .delete(translations)
    .where(
      and(eq(translations.id, translationId), eq(translations.userId, userId))
    )
}

export function changeLearningStatus(
  translationId: number,
  userId: number,
  status: LearningStatus
) {
  return db
    .update(translations)
    .set({ learningStatus: status })
    .where(
      and(eq(translations.id, translationId), eq(translations.userId, userId))
    )
}
