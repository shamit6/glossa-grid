'use server'
import { deleteTranslation as deleteTranslationDb } from '../db'

export async function deleteTranslation(translationId: number) {
  return deleteTranslationDb(translationId, 1)
}
