'use server'
import googleTranslate from 'google-translate-api-browser'
import { TranslationForm } from '../types'

export async function translate(q: string, target: string): Promise<TranslationForm> {
  const response = await googleTranslate(q, { to: 'he', from: 'en', raw: true })

  const raw = response.raw as string
  console.log({ raw })

  const targetLanguage = JSON.parse(JSON.parse(raw.split('\n')[3])[0][2])[1]
  const translation = targetLanguage[0][0][5][0][0]
  const english = JSON.parse(JSON.parse(raw.split('\n')[3])[0][2])[3]
  const [description, example] = english[1][0][0][1][0]

  return {
    word: q,
    translation,
    description,
    example,
  }
}
