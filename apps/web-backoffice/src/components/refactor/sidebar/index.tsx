import * as Collapsible from '@radix-ui/react-collapsible'
import { Menu } from 'lucide-react'
import Link from 'next/link'

import { LogoDevtrails } from '../logos/devtrails'
import { OrganizationSwitcher } from '../switchers/organization-switcher'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export function Sidebar() {
  return (
    <Collapsible.Root className="fixed left-0 right-0 top-0 z-20 flex flex-col gap-6 border-b border-zinc-200 bg-white p-4 data-[state=open]:bottom-0 dark:border-zinc-800 dark:bg-background-side lg:right-auto lg:w-80 lg:border-r lg:px-5 lg:py-8 lg:data-[state=closed]:bottom-0">
      <div className="flex items-center justify-between">
        <Link href="/refactor/admin">
          <LogoDevtrails className="w-32" />
        </Link>
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
        <Separator />
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
