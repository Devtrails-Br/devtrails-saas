import { z } from 'zod'

import { templateSchema } from '../models/template'

export const templateSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Template'), templateSchema]),
])

export type TemplateSubject = z.infer<typeof templateSchema>
