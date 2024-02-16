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
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'

export function NewTranslateForm({
  onTranslationSubmit,
}: {
  onTranslationSubmit: () => void
}) {
  const form = useForm<z.infer<typeof translationFormSchema>>({
    resolver: zodResolver(translationFormSchema),
    defaultValues: {
      word: '',
      translatedLanguage: 'he',
      originalLanguage: 'en',
    },
  })

  const { originalLanguage, translatedLanguage } = form.watch()

  async function onSubmit(values: TranslationForm) {
    void createTranslation(values)
    onTranslationSubmit()
  }

  async function fillWithGoogleTranslation() {
    const { translation, description, example } = await translate(
      form.getValues('word'),
      form.getValues('originalLanguage'),
      form.getValues('translatedLanguage')
    )
    form.setValue('translation', translation)
    form.setValue('description', description)
    form.setValue('example', example)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Popover>
          <PopoverTrigger asChild>
            <div
              className={cn(
                'text-sm text-muted-foreground cursor-pointer',
                (!originalLanguage || !translatedLanguage) && 'text-destructive'
              )}
            >{`${originalLanguage} -> ${translatedLanguage}`}</div>
          </PopoverTrigger>
          <PopoverContent side="bottom">
            <div className="grid gap-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="originalLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <FormLabel>Original language</FormLabel>
                        <FormControl>
                          <Input {...field} autoComplete="off" />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="translatedLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <FormLabel>Target Language</FormLabel>
                        <FormControl>
                          <Input {...field} autoComplete="off" />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
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
                    className="text-xs text-pretty ml-2"
                    onClick={(e) => {
                      e.preventDefault()
                      fillWithGoogleTranslation()
                    }}
                    disabled={!originalLanguage || !translatedLanguage}
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
