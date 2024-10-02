import '@/styles/globals.css'

import type { Metadata } from 'next'

import { PageWithHeaders } from '@/components/page-with-headers'

export const metadata: Metadata = {
  title: 'Saas Next 15rc com RBAC',
}

export default async function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PageWithHeaders>
      <>{children}</>
    </PageWithHeaders>
  )
}
