'use client'
import { Translation } from '@/app/db'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ReactNode, useMemo, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { LearningStatus } from '@/app/types'
import { useTranslations } from '@/app/hooks/useTranslations'

interface ActionProps {
  callback: (translationId: number) => void
  label: string
}

export function TranslationsList({
  learningStatus,
  actions,
}: {
  learningStatus: LearningStatus
  actions: ActionProps[]
}) {
  const [showTranslations, setShowTranslations] = useState(true)
  const { translations } = useTranslations()

  const translationsList = useMemo(() => {
    return translations.filter(
      (translation) =>
        translation.learningStatus === learningStatus ||
        !translation.learningStatus
    )
  }, [translations, learningStatus])

  return (
    <div className="h-full">
      <div className="flex flex-row-reverse items-center space-x-2 space-x-reverse ">
        <Switch
          id="show-translations"
          onCheckedChange={() => setShowTranslations(!showTranslations)}
          checked={showTranslations}
        />
        <Label htmlFor="show-translations">Show Translations</Label>
      </div>
      <div className="h-max max-h-max pb-12">
        {translationsList.map((translation) => (
          <div key={translation.id}>
            <div className="flex items-center justify-between">
              <div className="self-start p-3">{translation.word}</div>
              {!showTranslations ? null : (
                <Collapsible className="flex flex-col grow p-3">
                  <CollapsibleTrigger asChild>
                    <div className="self-end cursor-pointer">
                      {translation.translation}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="line-clamp-2 text-sm text-muted-foreground ml-1">
                      {translation.description}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              )}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                      <DotsHorizontalIcon className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {actions.map(({ callback, label }, index) => (
                      <DropdownMenuItem
                        key={index}
                        onSelect={() => {
                          callback(translation.id)
                        }}
                      >
                        {label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  )
}
