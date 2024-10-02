import { z } from 'zod'

import { sectionSchema } from '../models/section'

export const sectionSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Section'), sectionSchema]),
])

export type SectionSubject = z.infer<typeof sectionSchema>
