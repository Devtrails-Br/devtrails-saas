import type { FastifyInstance, FastifyRequest } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return sub
      } catch {
        throw new UnauthorizedError('Invalid token')
      }
    }

    request.getUserMembership = async (slug: string) => {
      const userId = await request.getCurrentUserId()

      const member = await prisma.member.findFirst({
        where: {
          userId,
          organization: {
            slug,
          },
        },
        include: {
          organization: true,
        },
      })

      if (!member) {
        throw new UnauthorizedError(`You're not a member of this organization.`)
      }

      const { organization, ...membership } = member

      return {
        organization,
        membership,
      }
    }
  })
})

export const authMiddleware = async (request: FastifyRequest) => {
  try {
    const { sub } = await request.jwtVerify<{ sub: string }>()

    request.getCurrentUserId = async () => await sub
  } catch {
    throw new UnauthorizedError('Invalid token')
  }
}
