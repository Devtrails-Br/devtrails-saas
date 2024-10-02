import type { ReactNode } from 'react'

interface SectionContentGridProps {
  children: ReactNode
}

export function SectionContentGrid({ children }: SectionContentGridProps) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
      {children}
    </div>
  )
}
