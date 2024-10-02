import * as Collapsible from '@radix-ui/react-collapsible'
import { getCurrentOrg } from '@root/src/auth/auth'
import {
  CheckSquare,
  Cog,
  Flag,
  Home,
  Layout,
  LifeBuoy,
  Menu,
  SquareStack,
  Users,
} from 'lucide-react'
import Link from 'next/link'

import { LogoDevtrails } from '../logo/devtrails'
import { OrganizationSwitcher } from '../organization-switcher'
import { ProfileButton } from '../profile-button'
import { Button } from '../ui/button'
import { NavItem } from './nav-item'
import { Profile } from './profile'
import { UsedSpaceWidget } from './used-space-widget'

export function Sidebar() {
  const currentOrg = getCurrentOrg()

  return (
    <Collapsible.Root className="fixed left-0 right-0 top-0 z-20 flex flex-col gap-6 border-b border-zinc-200 bg-white p-4 data-[state=open]:bottom-0 dark:border-zinc-800 dark:bg-background-side lg:right-auto lg:w-80 lg:border-r lg:px-5 lg:py-8 lg:data-[state=closed]:bottom-0">
      <div className="flex items-center justify-between">
        <Link href="/">
          <LogoDevtrails className="w-32" />
        </Link>
        <ProfileButton />
        <Collapsible.Trigger className="lg:hidden" asChild>
          <Button variant="ghost">
            <Menu className="size-5" />
          </Button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content
        forceMount
        className="flex flex-1 flex-col gap-6 data-[state=closed]:hidden lg:data-[state=closed]:flex"
      >
        <OrganizationSwitcher />
        <div className="h-px bg-zinc-200 dark:bg-zinc-700" />

        <nav className="space-y-0.5">
          <NavItem title="Home" href="/" icon={Home} />
          <NavItem
            title="Templates"
            href={`/org/${currentOrg}/templates`}
            icon={Layout}
          />
          <NavItem title="Projects" href="/" icon={SquareStack} />
          <NavItem title="Tasks" href="/" icon={CheckSquare} />
          <NavItem title="Reporting" href="/" icon={Flag} />
          <NavItem title="Users" href="/" icon={Users} />
        </nav>

        <div className="mt-auto flex flex-col gap-6">
          <nav className="space-y-0.5">
            <NavItem title="Support" href="/" icon={LifeBuoy} />
            <NavItem title="Settings" href="/" icon={Cog} />
          </nav>

          <UsedSpaceWidget />

          <div className="h-px bg-zinc-200 dark:bg-zinc-700" />

          <Profile />
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
