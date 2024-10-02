import { z } from 'zod'

import { sectionFieldSchema } from '../models/section-field'

export const sectionFieldSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('SectionField'), sectionFieldSchema]),
])

export type SectionFieldSubject = z.infer<typeof sectionFieldSchema>
