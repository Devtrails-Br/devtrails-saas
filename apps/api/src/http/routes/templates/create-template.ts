import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function createTemplate(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/:slug/templates',
      {
        schema: {
          tags: ['Templates'],
          summary: 'Create a new template',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            templateSlug: z.string(),
            description: z.string(),
          }),
          params: z.object({
            slug: z.string(),
          }),
          response: {
            201: z.object({
              templateId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Template')) {
          throw new UnauthorizedError(
            `You're not allowed to create new template.`,
          )
        }

        const { name, description, templateSlug } = request.body

        const template = await prisma.template.create({
          data: {
            name,
            templateSlug,
            description,
          },
        })

        return reply.status(201).send({
          templateId: template.id,
        })
      },
    )
}
