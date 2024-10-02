import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function getTemplateSection(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/templates/:templateId/sections',
      {
        schema: {
          tags: ['Templates'],
          summary: 'Get template sections',
          security: [{ bearerAuth: [] }],
          params: z.object({
            templateId: z.string(),
          }),
          response: {
            200: z.object({
              sections: z.array(
                z.object({
                  sectionId: z.string().uuid(),
                  section: z.string(),
                  fields: z.array(
                    z.object({
                      fieldId: z.string().uuid(),
                      field: z.string(),
                      type: z.enum(['TEXT', 'RICH_TEXT', 'IMAGE', 'BOOLEAN']),
                      isRequired: z.boolean(),
                    }),
                  ),
                }),
              ),
            }),
          },
        },
      },
      async (request) => {
        const { templateId } = request.params

        const sections = await prisma.section.findMany({
          where: {
            templateId,
          },
          select: {
            id: true,
            name: true,
            fields: {
              select: {
                id: true,
                name: true,
                type: true,
                isRequired: true,
              },
            },
          },
        })

        const formattedSections = sections.map((section) => ({
          sectionId: section.id,
          section: section.name,
          fields: section.fields.map((field) => ({
            fieldId: field.id,
            field: field.name,
            type: field.type,
            isRequired: field.isRequired,
          })),
        }))

        return {
          sections: formattedSections,
        }
      },
    )
}
