'use client'

import { uploadLogoOrganization } from '@root/src/http/upload-logo-organization'
import {
  type ComponentProps,
  forwardRef,
  type InputHTMLAttributes,
  useEffect,
} from 'react'

import { useInputFile } from './root'

interface UploadFileProps
  extends ComponentProps<'input'>,
    InputHTMLAttributes<HTMLInputElement> {
  name: string
  onSuccess: (fileUrl: string) => Promise<void>
}

export const UploadFile = forwardRef<HTMLInputElement, UploadFileProps>(
  ({ onSuccess, id, name, ...props }: UploadFileProps, ref) => {
    const { files } = useInputFile()

    async function handleUploadFile() {
      if (!files[0]) return

      try {
        const formData = new FormData()
        formData.append('file', files[0])

        const response = await uploadLogoOrganization({ file: files[0] })
        const fileUrl = response.logoUrl.toString()
        onSuccess(fileUrl)
      } catch (error) {
        console.error('Erro no upload', error)
        throw new Error('Falha no upload')
      }
    }

    useEffect(() => {
      handleUploadFile()
    }, [files])

    return (
      <input className="sr-only" id={id} name={name} ref={ref} {...props} />
    )
  },
)
