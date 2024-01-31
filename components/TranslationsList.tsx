import { Translation } from '@/app/db'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

export function TranslationsList({
  translations,
}: {
  translations: Translation[]
}) {
  return (
    <div>
      {translations.map((translation) => (
        <div key={translation.id}>
          <div className="flex items-center justify-between">
            <div className="self-start p-3">{translation.originalWord}</div>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {translation.description}
            </p>
            <Collapsible className="flex flex-row-reverse">
              <CollapsibleTrigger asChild>
                <Button variant="link" className="opacity-75 text-xs">
                  Show Translation
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div>{translation.translation}</div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <Separator />
        </div>
      ))}
    </div>
  )
}
