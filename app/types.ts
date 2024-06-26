import { z } from 'zod'

export const translationFormSchema = z.object({
  word: z.string().min(2, {
    message: 'Word must be at least 2 characters.',
  }),
  translation: z.string().min(2, {
    message: 'Translation must be at least 2 characters.',
  }),
  description: z.string().optional(),
  example: z.string().optional(),
  fromLanguage: z.string().min(2, {
    message: 'Language must be at least 2 characters.',
  }),
  toLanguage: z.string().min(2, {
    message: 'Language must be at least 2 characters.',
  }),
})

export type TranslationForm = z.infer<typeof translationFormSchema>

export type LearningStatus = 'new' | 'onLearning' | 'learned'
