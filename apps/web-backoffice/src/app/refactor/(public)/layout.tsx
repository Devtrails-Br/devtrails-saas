import '@/styles/globals.css'

import { isAuthenticated } from '@root/src/auth/auth'
import { HeaderSinglePage } from '@root/src/components/refactor/headers/header-single-page'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Create Next App',
}

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (isAuthenticated()) {
    redirect('/refactor/')
  }
  return (
    <div className="container mx-auto flex min-h-screen flex-col space-y-4">
      <HeaderSinglePage />
      <div className="w-full max-w-xs">{children}</div>
    </div>
  )
}
