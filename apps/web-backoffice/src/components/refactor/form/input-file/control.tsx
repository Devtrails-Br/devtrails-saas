'use client'

import type { ChangeEvent, ComponentProps } from 'react'

import { useInputFile } from './root'

interface ControlProps extends ComponentProps<'input'> {}

export function Control({ multiple = false, ...props }: ControlProps) {
  const { id, onFilesSelected } = useInputFile()

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return
    }

    const files = Array.from(event.target.files)

    onFilesSelected(files, multiple)
  }

  return (
    <input
      type="file"
      className="sr-only"
      multiple={multiple}
      id={id}
      onChange={handleFilesSelected}
      {...props}
    />
  )
}
