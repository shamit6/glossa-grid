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

const formSchema = z.object({
  word: z.string().min(2, {
    message: 'Word must be at least 2 characters.',
  }),
})

function NewTranslateForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    translate(values.word, 'he').then((res) => {
      console.log('res for ' + values.word)
      console.log(res)
    })
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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Add translation
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <NewTranslateForm />
      </PopoverContent>
    </Popover>
  )
}
