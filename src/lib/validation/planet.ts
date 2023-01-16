import { Static, Type } from '@sinclair/typebox'

export const planetSchema = Type.Object({
  name: Type.String(),
  moon: Type.Integer()
})

export type PlanetData = Static<typeof planetSchema>
