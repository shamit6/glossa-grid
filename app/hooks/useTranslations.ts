import useSWR from 'swr'
import { Translation } from '@/app/db'
import { useToast } from '@/components/ui/use-toast'
import { useCallback } from 'react'
import { changeLearningStatus } from '@/app/actions/changeLearningStatus'
import type { LearningStatus } from '../types'

export function useTranslations() {
  const { data: translations = [], mutate } =
    useSWR<Translation[]>('/api/translations')
  const { toast } = useToast()

  const deleteTranslation = useCallback(
    async (id: number) => {
      mutate(
        async (currentTranslations = []) => {
          try {
            await deleteTranslation(id)
            toast({
              title: 'Translation deleted',
              className: 'relative bg-green-500 mt-3 text-primary-foreground',
              duration: 3000,
            })

            return currentTranslations.filter((t) => t.id !== id)
          } catch (error) {
            toast({
              title: 'Failed to delete translation',
              description: 'Error in deleting translation',
              className: 'relative bg-red-500 mt-3 text-primary-foreground',
              duration: 3000,
            })
            throw error
          }
        },
        {
          optimisticData: (currentTranslations = translations) =>
            currentTranslations.filter((t) => t.id !== id),
          rollbackOnError: true,
        }
      )
    },
    [mutate, toast, translations]
  )

  const updateLearningStatus = useCallback(
    async (id: number, learningStatus: LearningStatus) => {
      mutate(
        async (currentTranslations = []) => {
          try {
            await changeLearningStatus(id, learningStatus)
            toast({
              title: 'Learning status updated',
              className: 'relative bg-green-500 mt-3 text-primary-foreground',
              duration: 3000,
            })

            return currentTranslations.map((t) =>
              t.id === id ? { ...t, learningStatus } : t
            )
          } catch (error) {
            toast({
              title: 'Failed to change learning status',
              description: 'Error in changing learning status',
              className: 'relative bg-red-500 mt-3 text-primary-foreground',
              duration: 3000,
            })
            throw error
          }
        },
        {
          optimisticData: (currentTranslations = translations) => {
            return currentTranslations.map((t) =>
              t.id === id ? { ...t, learningStatus } : t
            )
          },
          populateCache: false,
          rollbackOnError: true,
        }
      )
    },
    [mutate, toast, translations]
  )

  return {
    translations,
    deleteTranslation,
    updateLearningStatus,
  }
}
