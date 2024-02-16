import useSWR from 'swr'
import { Translation } from '@/app/db'
import { useToast } from '@/components/ui/use-toast'
import { useCallback } from 'react'
import { changeLearningStatus } from '@/app/actions/changeLearningStatus'
import type { LearningStatus, TranslationForm } from '../types'
import { deleteTranslation as deleteTranslationAction } from '@/app/actions/deleteTranslation'
import { createTranslation as createTranslationAction } from '@/app/actions/createTranslation'

export function useTranslations() {
  const { data: translations = [], mutate } =
    useSWR<Translation[]>('/api/translations')
  const { toast } = useToast()

  const deleteTranslation = useCallback(
    async (id: number) => {
      mutate(
        async (currentTranslations = translations) => {
          try {
            await deleteTranslationAction(id)
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

  const createTranslation = useCallback(
    async (translation: TranslationForm) => {
      mutate(
        async (currentTranslations = translations) => {
          try {
            const dbTransaction = await createTranslationAction(translation)
            toast({
              title: 'Translation created',
              className: 'relative bg-green-500 mt-3 text-primary-foreground',
              duration: 3000,
            })

            return [...dbTransaction, ...currentTranslations]
          } catch (error) {
            toast({
              title: 'Failed to create translation',
              description: 'Error in creating translation',
              className: 'relative bg-red-500 mt-3 text-primary-foreground',
              duration: 3000,
            })
            throw error
          }
        },
        {
          optimisticData: (currentTranslations = translations) => {
            return [translation as Translation, ...currentTranslations]
          },
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
    createTranslation,
  }
}
