import type { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import uploadConfig from '@/config/upload'
import { auth, authMiddleware } from '@/http/middlewares/auth'

const upload = multer({
  storage: uploadConfig.storage,
})

export async function uploadLogoOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/upload-logo',
      {
        preHandler: [authMiddleware, upload.single('file')],
        schema: {
          tags: ['Organizations'],
          summary: 'Upload logo organization',
          security: [{ bearerAuth: [] }],
          consumes: ['multipart/form-data'],
          response: {
            201: z.object({
              logoUrl: z.string(),
            }),
            400: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        if (!request.file) {
          return reply.status(400).send({ message: 'No file uploaded' })
        }

        const file = request.file

        return reply.status(201).send({ logoUrl: file.path })
      },
    )
}
