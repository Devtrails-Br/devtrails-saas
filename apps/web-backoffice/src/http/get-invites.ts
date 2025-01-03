import type { Role } from '@devtrails-saas/auth'

import { api } from './api-client'

export interface GetInvitesResponse {
  invites: {
    id: string
    createdAt: string
    role: Role
    email: string
    author: {
      name: string | null
      id: string
    } | null
  }[]
}

export async function getInvites(org: string) {
  const result = await api
    .get(`organizations/${org}/invites`, {
      next: {
        tags: [`${org}/invites`],
      },
    })
    .json<GetInvitesResponse>()

  return result
}
