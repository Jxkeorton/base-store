import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'ze3b1q5i',
  dataset: 'production',
  apiVersion: new Date().toISOString().split('T')[0],
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder =imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource): string => {
  const imageUrl = builder.image(source).url();
  return imageUrl || '';
};