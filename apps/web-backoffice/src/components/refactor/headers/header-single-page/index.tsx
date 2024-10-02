import Link from 'next/link'

import { LogoDevtrails } from '../../logos/devtrails'
import { NavItem } from '../../navigators/nav-item'

export function HeaderSinglePage() {
  return (
    <div className="mt-2 flex min-h-10 w-full items-center justify-between py-2">
      <Link href="/refactor/home">
        <LogoDevtrails className="w-32" />
      </Link>

      <nav className="flex items-center space-x-4">
        <NavItem href="/refactor/home" label="Home" />
        <NavItem href="/refactor/about" label="Sobre" />
        <NavItem href="/refactor/services" label="Serviços" />
        <NavItem variant="button" href="/auth/sign-in" label="Entrar" />
        <NavItem
          variant="button-outline"
          href="/auth/sign-up"
          label="Cadastrar"
        />
      </nav>
    </div>
  )
}
