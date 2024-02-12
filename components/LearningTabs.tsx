'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TranslationsList } from '@/components/TranslationsList'
import { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'

export default function LearningTabs() {
  const [currentTab, setCurrentTab] = useState('0')

  return (
    <div className="p-3 w-full h-full lg:w-4/5 m-auto">
      <Tabs defaultValue="0" value={currentTab} className="w-full h-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="0"
            onClick={() => {
              setCurrentTab('0')
            }}
          >
            New
          </TabsTrigger>
          <TabsTrigger
            value="1"
            onClick={() => {
              setCurrentTab('1')
            }}
          >
            On Learning
          </TabsTrigger>
          <TabsTrigger
            value="2"
            onClick={() => {
              setCurrentTab('2')
            }}
          >
            Learned
          </TabsTrigger>
        </TabsList>
        <TabsContent value={currentTab} className="h-[calc(100%-4rem)]">
          <SwipeableViews
            className="h-full"
            onChangeIndex={(index) => {
              setCurrentTab(index.toString())
            }}
            index={parseInt(currentTab)}
            containerStyle={{ height: '100%' }}
          >
            <TranslationsList learningStatus='new' />
            <div>on learning</div>
            <div>learned</div>
          </SwipeableViews>
        </TabsContent>
      </Tabs>
    </div>
  )
}
