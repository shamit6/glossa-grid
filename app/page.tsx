import { NewTranslationButton } from '@/components/NewTranslationButton'
import { auth } from './auth'
import { getTranslations } from './db'
import LearningTabs from '@/components/LearningTabs'
import { SWRProvider } from './hooks/swrProvider'
import { Toaster } from '@/components/ui/toaster'

export default async function Page() {
  const session = await auth()
  const translations = await getTranslations(Number(session?.user?.id!))

  return (
    <SWRProvider fallback={{ '/api/translations': translations }}>
      <div className="h-screen max-h-screen">
        <LearningTabs />
        <div className="fixed right-0 bottom-0 p-3 flex flex-col items-end w-full">
          <NewTranslationButton />
          <div className="w-full">
            <Toaster />
          </div>
        </div>
      </div>
    </SWRProvider>
  )
}
