import type { Metadata } from 'next'

export const siteMetadata = {
  title: 'Public Future Initiative',
  description: 'A civic platform for policy, pilots, and public action',
  siteUrl: 'https://publicfutureinitiative.org',
  ogImage: '/og-image.png',
}

export interface PageMetadataOptions {
  title?: string
  description?: string
  ogImage?: string
  canonicalUrl?: string
}

export function generatePageMetadata({
  title,
  description,
  ogImage,
  canonicalUrl,
}: PageMetadataOptions = {}): Metadata {
  const resolvedTitle = title
    ? `${title} | ${siteMetadata.title}`
    : siteMetadata.title
  const resolvedDescription = description ?? siteMetadata.description
  const resolvedOgImage = ogImage ?? siteMetadata.ogImage
  const resolvedUrl = canonicalUrl ?? siteMetadata.siteUrl

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical: resolvedUrl },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: resolvedUrl,
      siteName: siteMetadata.title,
      images: [{ url: resolvedOgImage }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedOgImage],
    },
  }
}

export function generateOpenGraph(options: PageMetadataOptions = {}) {
  const meta = generatePageMetadata(options)
  return meta.openGraph
}
