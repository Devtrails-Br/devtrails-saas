import { cn } from '@root/src/lib/utils'
import type { ComponentProps } from 'react'

interface FormContainerProps extends ComponentProps<'div'> {}

export function FormContainer({ children, className }: FormContainerProps) {
  return (
    <div className={cn('flex flex-1 justify-end', className)}>
      <div className="w-full min-w-96 max-w-[480px] space-y-4 rounded-lg border bg-slate-900/45 p-10">
        {children}
      </div>
    </div>
  )
}
