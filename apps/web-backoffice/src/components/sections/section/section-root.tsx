import { cn } from '@root/src/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'

export const sectionRootVariants = cva(
  'flex flex-1 flex-col items-center via-transparent dark:via-transparent px-8 w-screen',
  {
    variants: {
      height: {
        fullHeight: 'min-h-screen',
        fitContent: 'min-h-content',
      },
      gradientPosition: {
        tl: 'bg-gradient-to-tl',
        tr: 'bg-gradient-to-tr',
        bl: 'bg-gradient-to-bl',
        br: 'bg-gradient-to-br',
      },
      gradientColor: {
        slate: 'from-slate-100 dark:from-slate-950',
        gray: 'from-gray-100 dark:from-gray-950',
        zinc: 'from-zinc-100 dark:from-zinc-950',
        neutral: 'from-neutral-100 dark:from-neutral-950',
        stone: 'from-stone-100 dark:from-stone-950',
        red: 'from-red-100 dark:from-red-950',
        orange: 'from-orange-100 dark:from-orange-950',
        amber: 'from-amber-100 dark:from-amber-950',
        yellow: 'from-yellow-100 dark:from-yellow-950',
        lime: 'from-lime-100 dark:from-lime-950',
        green: 'from-green-100 dark:from-green-950',
        emerald: 'from-emerald-100 dark:from-emerald-950',
        teal: 'from-teal-100 dark:from-teal-950',
        cyan: 'from-cyan-100 dark:from-cyan-950',
        sky: 'from-sky-100 dark:from-sky-950',
        blue: 'from-blue-100 dark:from-blue-950',
        indigo: 'from-indigo-100 dark:from-indigo-950',
        violet: 'from-violet-100 dark:from-violet-950',
        purple: 'from-purple-100 dark:from-purple-950',
        fuchsia: 'from-fuchsia-100 dark:from-fuchsia-950',
        pink: 'from-pink-100 dark:from-pink-950',
        rose: 'from-rose-100 dark:from-rose-950',
      },
    },
    defaultVariants: {
      height: 'fitContent',
      gradientPosition: 'tl',
      gradientColor: 'slate',
    },
  },
)

export interface SectionRootProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionRootVariants> {}

export function SectionRoot({
  className,
  children,
  height,
  gradientColor,
  gradientPosition,
}: SectionRootProps) {
  return (
    <div
      className={cn(
        sectionRootVariants({ height, gradientPosition, gradientColor }),
        className,
      )}
    >
      {children}
    </div>
  )
}
