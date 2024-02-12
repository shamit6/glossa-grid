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
import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { deleteTranslation } from '@/app/actions/deleteTranslation'
import { changeLearningStatus } from '@/app/actions/changeLearningStatus'
import useSWR from 'swr'
import { useToast } from '@/components/ui/use-toast'
import { LearningStatus } from '@/app/types'

export function TranslationsList({
  learningStatus,
}: {
  learningStatus: LearningStatus
}) {
  const { data: translations = [], mutate } =
    useSWR<Translation[]>('/api/translations')
  const [showTranslations, setShowTranslations] = useState(true)
  const { toast } = useToast()

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
        {translations
          .filter(
            (translation) =>
              translation.learningStatus === learningStatus || !learningStatus
          )
          .map((translation) => (
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
                      <DropdownMenuItem
                        onSelect={() => {
                          mutate(
                            async () => {
                              try {
                                await deleteTranslation(translation.id)
                                toast({
                                  title: 'Translation deleted',
                                  className:
                                    'relative bg-green-500 mt-3 text-primary-foreground',
                                  duration: 3000,
                                })

                                return translations.filter(
                                  (t) => t.id !== translation.id
                                )
                              } catch (error) {
                                toast({
                                  title: 'Failed to delete translation',
                                  description: 'Error in deleting translation',
                                  className:
                                    'relative bg-red-500 mt-3 text-primary-foreground',
                                  duration: 3000,
                                })
                                throw error
                              }
                            },
                            {
                              optimisticData: translations.filter(
                                (t) => t.id !== translation.id
                              ),
                              rollbackOnError: true,
                            }
                          )
                        }}
                      >
                        Delete
                        <DropdownMenuItem
                          onSelect={() => {
                            mutate(async () => {
                              try {
                                await changeLearningStatus(
                                  translation.id,
                                  'onLearning'
                                )
                                return translations.map((t) =>
                                  t.id === translation.id
                                    ? {
                                        ...t,
                                        learningStatus: 'onLearning',
                                      }
                                    : t
                                )
                              } catch (error) {
                                toast({
                                  title: 'Failed to change learning status',
                                  description:
                                    'Error in changing learning status',
                                  className:
                                    'relative bg-red-500 mt-3 text-primary-foreground',
                                  duration: 3000,
                                })
                                throw error
                              }
                            })
                          }}
                        >
                          Start learning
                        </DropdownMenuItem>
                      </DropdownMenuItem>
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
