'use server'
import { createTranslation as createTranslationDb } from '../db'
import type { TranslationForm } from '../types'

export async function createTranslation(translation: TranslationForm) {
  return createTranslationDb({
    userId: 1,
    ...translation,
  })
}
