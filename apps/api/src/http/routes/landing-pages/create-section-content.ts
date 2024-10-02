import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

const literalSchema = z.union([z.string(), z.number(), z.boolean()])
type Literal = z.infer<typeof literalSchema>
type Json = Literal | { [key: string]: Json } | Json[]
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
)

export async function createLandingPageSectionContent(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/landing-page/:landingPageId/:sectionId/content',
      {
        schema: {
          tags: ['Landing Pages'],
          summary: 'Create a new landing page section content',
          security: [{ bearerAuth: [] }],
          body: z.object({
            fieldContents: jsonSchema,
            isActive: z.boolean(),
          }),
          params: z.object({
            slug: z.string(),
            landingPageId: z.string(),
            sectionId: z.string(),
          }),
          response: {
            201: z.object({
              sectionContentId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug, landingPageId, sectionId } = request.params
        const userId = await request.getCurrentUserId()
        const { membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Template')) {
          throw new UnauthorizedError(
            `You're not allowed to create new landing page.`,
          )
        }

        const { fieldContents, isActive } = request.body

        const sectionContent = await prisma.sectionContent.create({
          data: {
            fieldContents,
            isActive,
            landingPageId,
            sectionId,
          },
        })

        return reply.status(201).send({
          sectionContentId: sectionContent.id,
        })
      },
    )
}
