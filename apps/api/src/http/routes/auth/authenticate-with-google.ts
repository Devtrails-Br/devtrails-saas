import { env } from '@devtrails-saas/env'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithGoogle(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/google',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with Google',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const googleOAuthUrl = new URL('https://oauth2.googleapis.com/token')

      const params = new URLSearchParams({
        client_id: env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri: env.GOOGLE_OAUTH_REDIRECT_URI,
        code,
        grant_type: 'authorization_code',
      })

      const googleAccessTokenResponse = await fetch(googleOAuthUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      })

      const googleAccessTokenData = await googleAccessTokenResponse.json()

      const { access_token: googleAccessToken } = z
        .object({
          access_token: z.string(),
          expires_in: z.number(),
          token_type: z.literal('Bearer'),
        })
        .parse(googleAccessTokenData)

      const googleUserResponse = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
          },
        },
      )

      const googleUserData = await googleUserResponse.json()

      const {
        id: googleId,
        picture: avatarUrl,
        name,
        email,
      } = z
        .object({
          id: z.string(),
          picture: z.string().url(),
          name: z.string().nullable(),
          email: z.string().email().nullable(),
        })
        .parse(googleUserData)

      if (!email) {
        throw new BadRequestError(
          'Your Google account must have an email to authenticate',
        )
      }

      const user = await prisma.user.upsert({
        where: { email },
        update: {
          avatarUrl,
          name,
        },
        create: {
          email,
          avatarUrl,
          name,
        },
      })

      let account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: 'GOOGLE',
            userId: user.id,
          },
        },
      })

      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: 'GOOGLE',
            userId: user.id,
            providerAccountId: googleId,
          },
        })
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return reply.status(201).send({ token })
    },
  )
}
