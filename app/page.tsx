import { NewTranslationButton } from '@/components/NewTranslationButton'
import translate from 'google-translate-api-browser'
export default async function Page() {
  // const translation = await translate('wasted', { to: 'he', from: 'en', raw: true })
  return (
    <div> 
      {/* <pre>{JSON.stringify(translation, null, 2)}</pre> */}
      <NewTranslationButton />
    </div>
  )
}
