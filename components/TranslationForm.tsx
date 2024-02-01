'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { translate } from '@/app/actions/googleTranslate'
import { Textarea } from './ui/textarea'
import { TranslationForm, translationFormSchema } from '@/app/types'
import { createTranslation } from '@/app/actions/createTranslation'

export function NewTranslateForm({
  onTranslationSubmit,
}: {
  onTranslationSubmit: () => void
}) {
  const form = useForm<z.infer<typeof translationFormSchema>>({
    resolver: zodResolver(translationFormSchema),
    defaultValues: {
      word: '',
    },
  })

  async function onSubmit(values: TranslationForm) {
    void createTranslation(values)
    onTranslationSubmit()
  }

  async function fillWithGoogleTranslation() {
    const { translation, description, example } = await translate(
      form.getValues('word'),
      'he'
    )
    form.setValue('translation', translation)
    form.setValue('description', description)
    form.setValue('example', example)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="word"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Word</FormLabel>
              <FormControl>
                <div className="flex">
                  <Input placeholder="hello" {...field} autoComplete="off" />
                  <Button
                    variant="secondary"
                    className="text-sm text-pretty ml-2"
                    onClick={(e) => {
                      e.preventDefault()
                      fillWithGoogleTranslation()
                    }}
                  >
                    Fill With Google Translation
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="translation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Translation</FormLabel>
              <FormControl>
                <Input
                  placeholder="שלום"
                  {...field}
                  autoComplete="off"
                  dir="rtl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="greeting"
                  {...field}
                  autoComplete="off"
                  dir="rtl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="example"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Example</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="hello world"
                  {...field}
                  autoComplete="off"
                  dir="rtl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
