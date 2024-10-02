import { z } from 'zod'

export const templateSchema = z.object({
  __typename: z.literal('Template').default('Template'),
  id: z.string(),
  ownerId: z.string(),
})

export type Template = z.infer<typeof templateSchema>
