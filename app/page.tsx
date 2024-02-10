import { NewTranslationButton } from '@/components/NewTranslationButton'
import { auth } from './auth'
import { getTranslations } from './db'
import LearningTabs from '@/components/LearningTabs'

export default async function Page() {
  const session = await auth()
  const translations = await getTranslations(Number(session?.user?.id!))

  return (
    <div className="h-screen max-h-screen">
      <div>
        <LearningTabs translations={translations} />
      </div>
      <div className="fixed right-0 bottom-0 mb-3 m-3">
        <NewTranslationButton />
      </div>
    </div>
  )
}
