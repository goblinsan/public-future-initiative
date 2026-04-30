import type { MetadataRoute } from 'next'
import { getAllContent } from '@/lib/content'
import type { Explainer, PolicyOption, Pilot, Action, GlossaryEntry, Debate } from '@/lib/types/content'
import { siteMetadata } from '@/lib/metadata'

const base = siteMetadata.siteUrl

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${base}/`, priority: 1.0, changeFrequency: 'weekly' },
  { url: `${base}/explainers`, priority: 0.9, changeFrequency: 'weekly' },
  { url: `${base}/policy`, priority: 0.9, changeFrequency: 'weekly' },
  { url: `${base}/policy/compare`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${base}/pilots`, priority: 0.9, changeFrequency: 'weekly' },
  { url: `${base}/actions`, priority: 0.8, changeFrequency: 'weekly' },
  { url: `${base}/debate`, priority: 0.8, changeFrequency: 'weekly' },
  { url: `${base}/glossary`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${base}/timeline`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${base}/about`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${base}/about/mission`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${base}/about/team`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${base}/about/advisors`, priority: 0.5, changeFrequency: 'monthly' },
  { url: `${base}/trust-center`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${base}/editorial-standards`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${base}/methodology`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${base}/governance`, priority: 0.5, changeFrequency: 'monthly' },
  { url: `${base}/corrections`, priority: 0.5, changeFrequency: 'monthly' },
  { url: `${base}/moderation`, priority: 0.5, changeFrequency: 'monthly' },
  { url: `${base}/contact`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${base}/get-involved`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${base}/partners`, priority: 0.5, changeFrequency: 'monthly' },
  { url: `${base}/faq`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${base}/privacy`, priority: 0.4, changeFrequency: 'yearly' },
  { url: `${base}/search`, priority: 0.6, changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const explainers = getAllContent<Explainer>('explainers').map(({ slug, frontmatter }) => ({
    url: `${base}/explainers/${slug}`,
    lastModified: frontmatter.updatedAt ?? frontmatter.publishedAt,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  const policies = getAllContent<PolicyOption>('policy').map(({ slug, frontmatter }) => ({
    url: `${base}/policy/${slug}`,
    lastModified: frontmatter.updatedAt ?? frontmatter.publishedAt,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  const pilots = getAllContent<Pilot>('pilots').map(({ slug, frontmatter }) => ({
    url: `${base}/pilots/${slug}`,
    lastModified: frontmatter.updatedAt ?? frontmatter.publishedAt,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  const actions = getAllContent<Action>('actions').map(({ slug, frontmatter }) => ({
    url: `${base}/actions/${slug}`,
    lastModified: frontmatter.updatedAt ?? frontmatter.publishedAt,
    priority: 0.6,
    changeFrequency: 'weekly' as const,
  }))

  const glossary = getAllContent<GlossaryEntry>('glossary').map(({ slug, frontmatter }) => ({
    url: `${base}/glossary/${slug}`,
    lastModified: frontmatter.publishedAt,
    priority: 0.5,
    changeFrequency: 'monthly' as const,
  }))

  const debates = getAllContent<Debate>('debate').map(({ slug, frontmatter }) => ({
    url: `${base}/debate/${slug}`,
    lastModified: frontmatter.updatedAt ?? frontmatter.publishedAt,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticRoutes, ...explainers, ...policies, ...pilots, ...actions, ...glossary, ...debates]
}
