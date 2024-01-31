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
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { translate } from '@/app/actions/translate'
import { useState } from 'react'

const formSchema = z.object({
  word: z.string().min(2, {
    message: 'Word must be at least 2 characters.',
  }),
})

function NewTranslateForm({
  onTranslationSubmit,
}: {
  onTranslationSubmit: () => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    void translate(values.word, 'he')
    // onTranslationSubmit()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="word"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="hello" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Translate</Button>
      </form>
    </Form>
  )
}

export function NewTranslationButton() {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Add translation
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <NewTranslateForm
          onTranslationSubmit={() => {
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
