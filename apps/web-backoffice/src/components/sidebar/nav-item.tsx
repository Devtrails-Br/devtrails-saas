import { ChevronDown } from 'lucide-react'
import type { ElementType } from 'react'

export function NavItem({
  title,
  href,
  icon: Icon,
}: Readonly<{
  title: string
  href: string
  icon: ElementType
}>) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 rounded px-3 py-2 hover:bg-violet-50 dark:hover:bg-zinc-800"
    >
      <Icon className="size-5 text-zinc-500" />
      <span className="font-medium text-zinc-700 group-hover:text-violet-500 dark:text-zinc-100 dark:group-hover:text-violet-300">
        {title}
      </span>
      <ChevronDown className="ml-auto size-5 text-zinc-400 group-hover:text-violet-300 dark:text-zinc-600" />
    </a>
  )
}
