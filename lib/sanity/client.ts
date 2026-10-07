import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

// Read-only, public dataset: no token is needed (or wanted) here.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Authoritative reads (e.g. checkout prices) must bypass the CDN cache.
export const freshClient = client.withConfig({ useCdn: false })
