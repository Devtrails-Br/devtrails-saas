import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function createSectionField(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/:slug/templates/section/:sectionId/field',
      {
        schema: {
          tags: ['Templates'],
          summary: 'Create a new section field',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            type: z.union([
              z.literal('TEXT'),
              z.literal('RICH_TEXT'),
              z.literal('IMAGE'),
              z.literal('BOOLEAN'),
            ]),
            isRequired: z.boolean(),
          }),
          params: z.object({
            slug: z.string(),
            sectionId: z.string(),
          }),
          response: {
            201: z.object({
              sectionFieldId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug, sectionId } = request.params
        const userId = await request.getCurrentUserId()
        const { membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Template')) {
          throw new UnauthorizedError(
            `You're not allowed to create new section field.`,
          )
        }

        const { name, type, isRequired } = request.body

        const sectionField = await prisma.sectionField.create({
          data: {
            name,
            type,
            isRequired,
            sectionId,
          },
        })

        return reply.status(201).send({
          sectionFieldId: sectionField.id,
        })
      },
    )
}
