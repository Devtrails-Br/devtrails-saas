import { cn } from '@root/src/lib/utils'
import type { ComponentProps } from 'react'

interface SectionContentProps extends ComponentProps<'div'> {}

export function SectionContent({ children, className }: SectionContentProps) {
  return (
    <div
      className={cn('flex w-full flex-1 flex-col overflow-hidden', className)}
    >
      {children}
    </div>
  )
}
