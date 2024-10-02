import { cn } from '@root/src/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type HTMLAttributes } from 'react'

const imageCellVariants = cva(
  'min-w-full max-w-full min-h-60 overflow-hidden rounded-2xl object-cover ',
  {
    variants: {
      variant: {
        odd: 'bg-brand',
        even: '-translate-y-28 bg-orange-400',
      },
    },
    defaultVariants: {
      variant: 'odd',
    },
  },
)

export interface ImageCellProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof imageCellVariants> {
  src?: string
  alt?: string
}

const ImageCell = forwardRef<HTMLImageElement, ImageCellProps>(
  ({ className, src, alt = 'imagens de capa', variant, ...props }, ref) => {
    return (
      <div
        className={cn(imageCellVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {src && <img src={src} alt={alt} className="w-full" />}
      </div>
    )
  },
)

export { ImageCell, imageCellVariants }
