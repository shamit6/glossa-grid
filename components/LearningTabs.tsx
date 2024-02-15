'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TranslationsList } from '@/components/TranslationsList'
import { useCallback, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { useTranslations } from '@/app/hooks/useTranslations'

export default function LearningTabs() {
  const [currentTab, setCurrentTab] = useState('0')
  const { deleteTranslation, updateLearningStatus } = useTranslations()

  const startLearningTranslation = useCallback(
    (translationId: number) => {
      updateLearningStatus(translationId, 'onLearning')
    },
    [updateLearningStatus]
  )

  const backToNewTranslations = useCallback(
    (translationId: number) => {
      updateLearningStatus(translationId, 'new')
    },
    [updateLearningStatus]
  )

  const moveToLearnedTranslations = useCallback(
    (translationId: number) => {
      updateLearningStatus(translationId, 'learned')
    },
    [updateLearningStatus]
  )

  return (
    <div className="p-3 w-full h-full lg:w-4/5 m-auto">
      <Tabs defaultValue="0" value={currentTab} className="w-full h-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="0"
            onClick={() => {
              window.history.replaceState({}, '', '/?tab=new')
              setCurrentTab('0')
            }}
          >
            New
          </TabsTrigger>
          <TabsTrigger
            value="1"
            onClick={() => {
              window.history.replaceState({}, '', '/?tab=onLearning')
              setCurrentTab('1')
            }}
          >
            On Learning
          </TabsTrigger>
          <TabsTrigger
            value="2"
            onClick={() => {
              window.history.replaceState({}, '', '/?tab=learned')
              setCurrentTab('2')
            }}
          >
            Learned
          </TabsTrigger>
        </TabsList>
        <TabsContent value={currentTab} className="h-[calc(100%-4rem)]">
          <SwipeableViews
            className="h-full overflow-y-hidden"
            onChangeIndex={(index) => {
              setCurrentTab(index.toString())
            }}
            index={parseInt(currentTab)}
            containerStyle={{ height: '100%' }}
          >
            <TranslationsList
              learningStatus="new"
              actions={[
                {
                  callback: startLearningTranslation,
                  label: 'Start learning',
                },
                { callback: deleteTranslation, label: 'Delete' },
              ]}
            />
            <TranslationsList
              learningStatus="onLearning"
              actions={[
                {
                  callback: backToNewTranslations,
                  label: 'Back to new',
                },
                {
                  callback: moveToLearnedTranslations,
                  label: 'Move to learned',
                },
                { callback: deleteTranslation, label: 'Delete' },
              ]}
            />
            <TranslationsList
              learningStatus="learned"
              actions={[
                {
                  callback: startLearningTranslation,
                  label: 'Back to learning',
                },
                { callback: deleteTranslation, label: 'Delete' },
              ]}
            />
          </SwipeableViews>
        </TabsContent>
      </Tabs>
    </div>
  )
}
