import { type SchemaTypeDefinition } from 'sanity'
import product from './schemas/product'
import banner from './schemas/banner'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    banner,
  ],
}
