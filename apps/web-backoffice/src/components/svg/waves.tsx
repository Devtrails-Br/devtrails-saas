import { cn } from '@root/src/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'

export const waveVariants = cva('absolute', {
  variants: {
    position: {
      top: 'left-0 right-0 top-96 -z-10',
      center: 'left-0 right-0 top-2/3 -z-10',
      bottom: 'left-0 right-0 -bottom-28 -z-10',
    },
  },
  defaultVariants: {
    position: 'bottom',
  },
})

export interface WaveProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof waveVariants> {
  strokeWidth?: number
}

export function Waves({ className, position, strokeWidth = 4 }: WaveProps) {
  return (
    <div className={cn(waveVariants({ position, className }))}>
      <svg
        className="w-[840px] sm:w-full"
        width="2745"
        height="488"
        viewBox="0 0 2745 488"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 330.864C232.505 403.801 853.749 527.683 1482.69 439.719C2111.63 351.756 2585.54 434.588 2743.87 487"
          className="stroke-slate-300/40 dark:stroke-neutral-700/50"
          stroke="currentColor"
          stroke-width={strokeWidth}
        />
        <path
          d="M0.5 308.873C232.505 381.81 853.749 505.692 1482.69 417.728C2111.63 329.765 2585.54 412.597 2743.87 465.009"
          className="stroke-slate-300/40 dark:stroke-neutral-700/50"
          stroke="currentColor"
          stroke-width={strokeWidth}
        />
        <path
          d="M0.5 286.882C232.505 359.819 853.749 483.701 1482.69 395.738C2111.63 307.774 2585.54 390.606 2743.87 443.018"
          className="stroke-slate-300/40 dark:stroke-neutral-700/50"
          stroke="currentColor"
          stroke-width={strokeWidth}
        />
        <path
          d="M0.5 264.891C232.505 337.828 853.749 461.71 1482.69 373.747C2111.63 285.783 2585.54 368.615 2743.87 421.027"
          className="stroke-slate-300/40 dark:stroke-neutral-700/50"
          stroke="currentColor"
          stroke-width={strokeWidth}
        />
        <path
          d="M0.5 242.9C232.505 315.837 853.749 439.719 1482.69 351.756C2111.63 263.792 2585.54 346.624 2743.87 399.036"
          className="stroke-slate-300/40 dark:stroke-neutral-700/50"
          stroke="currentColor"
          stroke-width={strokeWidth}
        />
        <path
          d="M0.5 220.909C232.505 293.846 853.749 417.728 1482.69 329.765C2111.63 241.801 2585.54 324.633 2743.87 377.045"
          className="stroke-slate-300/40 dark:stroke-neutral-700/50"
          stroke="currentColor"
          stroke-width={strokeWidth}
        />
        <path
          d="M0.5 198.918C232.505 271.855 853.749 395.737 1482.69 307.774C2111.63 219.81 2585.54 302.642 2743.87 355.054"
          className="stroke-slate-300/40 dark:stroke-neutral-700/50"
          stroke="currentColor"
          stroke-width={strokeWidth}
        />
        <path
          d="M0.5 176.927C232.505 249.864 853.749 373.746 1482.69 285.783C2111.63 197.819 2585.54 280.651 2743.87 333.063"
          className="stroke-slate-300/40 dark:stroke-neutral-700/50"
          stroke="currentColor"
          stroke-width={strokeWidth}
        />
        <path
          d="M0.5 154.937C232.505 227.873 853.749 351.756 1482.69 263.792C2111.63 175.828 2585.54 258.661 2743.87 311.072"
          className="stroke-slate-300/40 dark:stroke-neutral-700/50"
          stroke="currentColor"
          stroke-width={strokeWidth}
        />
        <path
          d="M0.5 132.946C232.505 205.882 853.749 329.765 1482.69 241.801C2111.63 153.837 2585.54 236.67 2743.87 289.082"
          className="stroke-slate-300/40 dark:stroke-neutral-700/50"
          stroke="currentColor"
          stroke-width={strokeWidth}
        />
        <path
          d="M0.5 110.955C232.505 183.891 853.749 307.774 1482.69 219.81C2111.63 131.846 2585.54 214.679 2743.87 267.091"
          className="stroke-slate-300/40 dark:stroke-neutral-700/50"
          stroke="currentColor"
          stroke-width={strokeWidth}
        />
        <path
          d="M0.5 88.9639C232.505 161.901 853.749 285.783 1482.69 197.819C2111.63 109.855 2585.54 192.688 2743.87 245.1"
          className="stroke-slate-300/40 dark:stroke-neutral-700/50"
          stroke="currentColor"
          stroke-width={strokeWidth}
        />
      </svg>
    </div>
  )
}
