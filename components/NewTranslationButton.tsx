'use client'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { NewTranslateForm } from './TranslationForm'

export function NewTranslationButton() {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Add translation
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-100 max-w-full'>
        <NewTranslateForm
          onTranslationSubmit={() => {
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
