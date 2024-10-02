'use client'

import {
  type ComponentProps,
  createContext,
  useContext,
  useId,
  useState,
} from 'react'

interface RootProps extends ComponentProps<'div'> {}

type InputFileContextType = {
  id: string
  files: File[]
  onFilesSelected: (files: File[], multiple?: boolean) => void
}

const InputFileContext = createContext({} as InputFileContextType)

export function Root(props: RootProps) {
  const id = useId()
  const [files, setFiles] = useState<File[]>([])

  function onFilesSelected(files: File[], multiple?: boolean) {
    if (multiple) {
      setFiles((prevFiles) => [...prevFiles, ...files])
    } else {
      setFiles(files)
    }
  }

  return (
    <InputFileContext.Provider value={{ id, files, onFilesSelected }}>
      <div {...props} />
    </InputFileContext.Provider>
  )
}

export const useInputFile = () => useContext(InputFileContext)
