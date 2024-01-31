import { NewTranslationButton } from '@/components/NewTranslationButton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { auth } from './auth'
import { getTranslations } from './db'
import { TranslationsList } from '@/components/TranslationsList'

export default async function Page() {
  const session = await auth()
  const translations = await getTranslations(Number(session?.user?.id!))

  return (
    <div className="flex flex-col justify-center items-center m-3">
      <div>
        <NewTranslationButton />
      </div>
      <div className="m-3 w-full lg:w-4/5">
        <Tabs defaultValue="new" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="onLearning">On Learning</TabsTrigger>
            <TabsTrigger value="learned">Learned</TabsTrigger>
          </TabsList>
          <TabsContent value="new">
            <TranslationsList translations={translations} />
          </TabsContent>
          <TabsContent value="onLearning">
            Change your password here.
          </TabsContent>
          <TabsContent value="learned">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
