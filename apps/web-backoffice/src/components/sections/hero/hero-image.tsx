import { cn } from '@root/src/lib/utils'
import type { ComponentProps } from 'react'

interface HeroImageProps extends ComponentProps<'div'> {
  src: string
}

export function HeroImage({ src, className }: HeroImageProps) {
  return (
    <div
      className={cn(
        'relative flex h-fit w-full flex-col items-center',
        className,
      )}
    >
      <img
        className="max-h-72 max-w-96 rounded-xl lg:max-h-[580px] lg:max-w-[1024px]"
        src={src}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        alt=""
      />

      <div className="absolute -start-12 -top-8 -z-[1] hidden size-32 -rotate-[8deg] rounded-lg bg-gradient-to-b from-purple-500 to-white dark:to-neutral-900 lg:block">
        <div className="relative h-full w-full">
          <div className="absolute left-px top-px size-full rounded-tl-lg bg-background"></div>
        </div>
      </div>

      <div className="absolute -bottom-8 -end-12 -z-[1] hidden size-48 -rotate-[8deg] rounded-lg bg-gradient-to-t from-purple-500 to-white dark:to-neutral-900 lg:block">
        <div className="relative h-full w-full">
          <div className="absolute bottom-px right-px size-full rounded-br-lg bg-background"></div>
        </div>
      </div>

      {/* <div className="absolute -end-4 -top-8 -z-[1] size-24 rounded-full bg-gradient-to-t from-violet-800 to-violet-500 p-px md:-end-4 md:size-32 lg:-end-32 lg:size-48">
        <div className="relative h-full w-full">
          <div className="absolute left-px top-px size-full rounded-full bg-background"></div>
        </div>
      </div> */}
    </div>
  )
}
