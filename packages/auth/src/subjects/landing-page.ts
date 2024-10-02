import { z } from 'zod'

import { landingPageSchema } from '../models/landing-page'

export const landingPageSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('LandingPage'), landingPageSchema]),
])

export type LandingPageSubject = z.infer<typeof landingPageSchema>
