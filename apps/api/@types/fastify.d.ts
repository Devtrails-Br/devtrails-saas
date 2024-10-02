import 'fastify'

import { Member, Organization } from '@prisma/client'
import { MulterFile } from 'fastify-multer'

declare module 'fastify' {
  interface FastifyRequest {
    getCurrentUserId(): Promise<string>
    getUserMembership(slug: string): Promise<{
      organization: Organization
      membership: Member
    }>
    file?: MulterFile
  }
}
