import '@/styles/globals.css'

import { Tabs, TabsButton, TabsPermission } from '@root/src/components/tabs'
import type { Metadata } from 'next'

import { ability, getCurrentOrg } from '@/auth/auth'

export const metadata: Metadata = {
  title: 'Saas Next 15rc com RBAC',
}

export default async function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentOrg = getCurrentOrg()

  const permissions = await ability()

  return (
    <>
      <Tabs>
        <TabsPermission can={permissions?.can('get', 'Template')}>
          <TabsButton label="Templates" href={`/org/${currentOrg}/templates`} />
        </TabsPermission>
      </Tabs>
      {children}
    </>
  )
}
