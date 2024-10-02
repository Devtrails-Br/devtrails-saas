import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function createLandingPage(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/landing-page',
      {
        schema: {
          tags: ['Landing Pages'],
          summary: 'Create a new landing page',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            subdomain: z.string(),
            description: z.string(),
            autoActivate: z.boolean(),
            startDate: z.string().optional(),
            endDate: z.string().optional(),
            seoTitle: z.string(),
            seoDescription: z.string(),
            seoKeywords: z.array(z.string()),
            seoImage: z.string(),
            seoCanonicalUrl: z.string(),
            templateId: z.string(),
          }),
          params: z.object({
            slug: z.string(),
          }),
          response: {
            201: z.object({
              landingPageId: z.string().uuid(),
              subdomain: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Template')) {
          throw new UnauthorizedError(
            `You're not allowed to create new landing page.`,
          )
        }

        const {
          name,
          subdomain,
          description,
          autoActivate,
          startDate,
          endDate,
          seoTitle,
          seoDescription,
          seoImage,
          seoKeywords,
          seoCanonicalUrl,
          templateId,
        } = request.body

        const landingPage = await prisma.landingPage.create({
          data: {
            name,
            subdomain,
            description,
            isActive: false,
            autoActivate,
            startDate,
            endDate,
            seoTitle,
            seoDescription,
            seoImage,
            seoKeywords,
            seoCanonicalUrl,
            ownerId: userId,
            organizationId: organization.id,
            templateId,
          },
        })

        return reply.status(201).send({
          landingPageId: landingPage.id,
          subdomain: landingPage.subdomain,
        })
      },
    )
}
