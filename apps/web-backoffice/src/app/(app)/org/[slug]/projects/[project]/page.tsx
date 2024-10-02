import { ability, getCurrentOrg } from '@root/src/auth/auth'
import { Tabs, TabsButton, TabsPermission } from '@root/src/components/tabs'

export default async function Project() {
  const currentOrg = getCurrentOrg()

  const permissions = await ability()
  return (
    <>
      <Tabs>
        <TabsPermission can={permissions?.can('get', 'Project')}>
          <TabsButton href={`/org/${currentOrg}`} label="Projects" />
        </TabsPermission>
        <TabsPermission can={permissions?.can('get', 'User')}>
          <TabsButton href={`/org/${currentOrg}/members`} label="Members" />
        </TabsPermission>
        <TabsPermission
          can={
            permissions?.can('update', 'Organization') ||
            permissions?.can('get', 'Billing')
          }
        >
          <TabsButton href={`/org/${currentOrg}/settings`}>
            Settings & Billing
          </TabsButton>
        </TabsPermission>
      </Tabs>
      <h1>Project</h1>
    </>
  )
}
