import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function createSection(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/:slug/templates/:templateId/section',
      {
        schema: {
          tags: ['Templates'],
          summary: 'Create a new section',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
          }),
          params: z.object({
            slug: z.string(),
            templateId: z.string(),
          }),
          response: {
            201: z.object({
              sectionId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug, templateId } = request.params
        const userId = await request.getCurrentUserId()
        const { membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Template')) {
          throw new UnauthorizedError(
            `You're not allowed to create new section.`,
          )
        }

        const { name } = request.body

        const section = await prisma.section.create({
          data: {
            name,
            templateId,
          },
        })

        return reply.status(201).send({
          sectionId: section.id,
        })
      },
    )
}
