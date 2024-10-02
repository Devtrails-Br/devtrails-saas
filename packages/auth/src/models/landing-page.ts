import { z } from 'zod'

export const landingPageSchema = z.object({
  __typename: z.literal('LandingPage').default('LandingPage'),
  id: z.string(),
  ownerId: z.string(),
})

export type LandingPage = z.infer<typeof landingPageSchema>
