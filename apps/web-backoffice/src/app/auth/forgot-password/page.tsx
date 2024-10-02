import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-full w-full flex-col space-y-4 py-4 pl-12 pr-4">
      <div className="flex w-full items-center text-sm">
        <Button className="w-fit" variant="link" size="sm" asChild>
          <Link href="/auth/sign-in">
            <ChevronLeft className="size-4" />
            <span className="pl-4">Voltar para login</span>
          </Link>
        </Button>
      </div>

      <div className="flex flex-1 items-center">
        <div className="h-fit w-full">
          <form action="" className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" />
            </div>

            <Button type="submit" className="w-full">
              Recover password
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
