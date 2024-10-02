import { cn } from '@root/src/lib/utils'
import type { ComponentProps, ReactNode } from 'react'

interface HeroRootProps extends ComponentProps<'div'> {
  children?: ReactNode
}

export function HeroRoot({ children, className }: HeroRootProps) {
  return (
    <div
      className={cn(
        'relative flex min-w-full flex-1 flex-col items-center overflow-hidden',
        className,
      )}
    >
      <div className="flex w-full max-w-[85rem] flex-1 flex-col">
        {children}
      </div>
    </div>
  )
}
