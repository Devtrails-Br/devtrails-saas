import { Slot } from '@radix-ui/react-slot'
import { cn } from '@root/src/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { type AnchorHTMLAttributes, forwardRef } from 'react'

const navVariants = cva(
  'border border-transparent transition-all ease-in-out duration-300 flex h-fit items-center px-5 py-1 text-white text-sm font-normal',
  {
    variants: {
      variant: {
        default:
          'hover:text-brand border-0 hover:border-b hover:border-brand border-b border-transparent',
        button: 'rounded bg-brand hover:brightness-125',
        'button-outline':
          'rounded border border-white hover:border-brand hover:text-white hover:bg-brand hover:brightness-125',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface NavItemProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navVariants> {
  asChild?: boolean
  label: string
}

const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ className, label, href, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'
    return (
      <Comp
        href={href}
        className={cn(navVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        <span>{label}</span>
      </Comp>
    )
  },
)

export { NavItem, navVariants }
