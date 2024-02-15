'use client'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { NewTranslateForm } from './TranslationForm'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export function NewTranslationButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Add translation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <NewTranslateForm
          onTranslationSubmit={() => {
            setOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
