import { z } from 'zod'

export const sectionSchema = z.object({
  __typename: z.literal('Section').default('Section'),
  id: z.string(),
  ownerId: z.string(),
})

export type Section = z.infer<typeof sectionSchema>
