'use client'

import { cn } from '@root/src/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  type ElementType,
  forwardRef,
  type HTMLAttributes,
  useMemo,
} from 'react'

import { useInputFile } from './root'

const imagePreviewVariants = cva(
  'flex items-center justify-center rounded-full bg-violet-50 dark:bg-violet-500/60',
  {
    variants: {
      size: {
        sm: 'size-8 *:size-5',
        base: 'size-16 *:size-10',
        lg: 'size-32 *:size-20',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
)

export interface ImagePreviewProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof imagePreviewVariants> {
  icon: ElementType
}

const ImagePreview = forwardRef<HTMLDivElement, ImagePreviewProps>(
  ({ icon: Icon, className, size, ...props }: ImagePreviewProps, ref) => {
    const { files } = useInputFile()

    const previewURL = useMemo(() => {
      if (files.length === 0) {
        return null
      }

      return URL.createObjectURL(files[0])
    }, [files])

    if (previewURL === null) {
      return (
        <div
          className={cn(imagePreviewVariants({ size, className }))}
          ref={ref}
          {...props}
        >
          <Icon className="text-violet-500 dark:text-violet-300" />
        </div>
      )
    } else {
      return (
        <img
          src={previewURL}
          alt=""
          className="size-16 rounded-full object-cover"
        />
      )
    }
  },
)

export { ImagePreview, imagePreviewVariants }
