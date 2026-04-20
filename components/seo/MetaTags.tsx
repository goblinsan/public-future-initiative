import type { Metadata } from 'next'

export interface MetaTagsProps {
  title: string
  description: string
  ogImage?: string
  canonicalUrl?: string
}

export function generateMetaTags({
  title,
  description,
  ogImage,
  canonicalUrl,
}: MetaTagsProps): Metadata {
  return {
    title,
    description,
    ...(canonicalUrl && { alternates: { canonical: canonicalUrl } }),
    openGraph: {
      title,
      description,
      ...(ogImage && { images: [{ url: ogImage }] }),
      ...(canonicalUrl && { url: canonicalUrl }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  }
}

export default function MetaTags(_props: MetaTagsProps) {
  return null
}
