import '@/styles/globals.css'

import { Sidebar } from '@root/src/components/sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Saas Next 15rc com RBAC',
}

export default function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  return (
    <>
      <div className="min-w-screen min-h-screen lg:grid lg:grid-cols-app">
        <Sidebar />
        <main className="max-w-[100vw] px-4 pb-12 pt-24 lg:col-start-2 lg:px-8 lg:pt-8">
          {children}
          {sheet}
        </main>
      </div>
    </>
  )
}
