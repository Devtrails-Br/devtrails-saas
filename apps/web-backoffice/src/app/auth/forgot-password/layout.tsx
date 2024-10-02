import '@/styles/globals.css'

import { BackgroundImageGrid } from '@root/src/components/refactor/others/background-image-grid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Next App',
}

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-screen w-screen lg:grid lg:grid-cols-auth-ltr">
      <div className="w-full">{children}</div>
      <BackgroundImageGrid />
    </div>
  )
}
