'use server'
import googleTranslate from 'google-translate-api-browser'

export async function translate(q: string, target: string) {
  const response = await googleTranslate(q, { to: 'he', from: 'en', raw: true })

  const raw = response.raw as string

  const targetLanguage = JSON.parse(JSON.parse(raw.split('\n')[3])[0][2])[1]
  const translate = targetLanguage[0][0][5][0][0]
  const english = JSON.parse(JSON.parse(raw.split('\n')[3])[0][2])[3]
  const [description, example] = english[1][0][0][1][0]
  return { translate, description, example }
}
