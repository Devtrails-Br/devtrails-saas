import { ReactNode } from 'react'

import { NavLink } from '../nav-link'
import { Button } from '../ui/button'

interface TabsProps {
  children: ReactNode
}

export function Tabs({ children }: TabsProps) {
  return (
    <div className="mb-2 border-b pb-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        {children}
      </nav>
    </div>
  )
}

interface TabsPermissionProps {
  can?: boolean
  children: ReactNode
}

export function TabsPermission({ can = false, children }: TabsPermissionProps) {
  if (!can) return null
  return <>{children}</>
}

interface TabsButtonProps {
  href: string
  label?: string
  children?: ReactNode
}

export function TabsButton({ href, label, children }: TabsButtonProps) {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
    >
      <NavLink href={href}>{label || children}</NavLink>
    </Button>
  )
}
