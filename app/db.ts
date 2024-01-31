import { drizzle } from 'drizzle-orm/postgres-js'
import { eq } from 'drizzle-orm'
import postgres from 'postgres'
import { genSaltSync, hashSync } from 'bcrypt-ts'
import { users, translations } from './schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

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

export async function getTranslations(
  userId: number
): Promise<Translation[]> {
  return await db
    .select()
    .from(translations)
    .where(eq(translations.userId, userId))
}

export async function createTranslation({
  userId,
  originalWord,
  translation,
  description,
  example,
}: z.infer<typeof insertTranslationSchema>) {
  return await db
    .insert(translations)
    .values({ userId, originalWord, translation, description, example })
    .returning()
}
