import { z } from 'zod'

export const sectionFieldSchema = z.object({
  __typename: z.literal('SectionField').default('SectionField'),
  id: z.string(),
  ownerId: z.string(),
})

export type SectionField = z.infer<typeof sectionFieldSchema>
