import { NextResponse } from 'next/server'
import { getAllContent } from '@/lib/content'
import type { Explainer, PolicyOption, Pilot, Action, GlossaryEntry } from '@/lib/types/content'

export interface SearchResult {
  slug: string
  title: string
  description: string
  type: 'explainer' | 'policy' | 'pilot' | 'action' | 'glossary'
  href: string
  tags?: string[]
  publishedAt?: string
}

export async function GET() {
  const results: SearchResult[] = []

  const explainers = getAllContent<Explainer>('explainers')
  for (const { slug, frontmatter } of explainers) {
    results.push({
      slug,
      title: frontmatter.title,
      description: frontmatter.description ?? frontmatter.summary ?? '',
      type: 'explainer',
      href: `/explainers/${slug}`,
      tags: frontmatter.tags,
      publishedAt: frontmatter.publishedAt,
    })
  }

  const policies = getAllContent<PolicyOption>('policy')
  for (const { slug, frontmatter } of policies) {
    results.push({
      slug,
      title: frontmatter.title,
      description: frontmatter.description ?? frontmatter.summary ?? '',
      type: 'policy',
      href: `/policy/${slug}`,
      tags: frontmatter.tags,
      publishedAt: frontmatter.publishedAt,
    })
  }

  const pilots = getAllContent<Pilot>('pilots')
  for (const { slug, frontmatter } of pilots) {
    results.push({
      slug,
      title: frontmatter.title,
      description: frontmatter.description ?? '',
      type: 'pilot',
      href: `/pilots/${slug}`,
      tags: frontmatter.tags,
      publishedAt: frontmatter.publishedAt,
    })
  }

  const actions = getAllContent<Action>('actions')
  for (const { slug, frontmatter } of actions) {
    results.push({
      slug,
      title: frontmatter.title,
      description: frontmatter.description ?? '',
      type: 'action',
      href: `/actions/${slug}`,
      tags: frontmatter.tags,
      publishedAt: frontmatter.publishedAt,
    })
  }

  const glossary = getAllContent<GlossaryEntry>('glossary')
  for (const { slug, frontmatter } of glossary) {
    results.push({
      slug,
      title: frontmatter.term,
      description: frontmatter.definition,
      type: 'glossary',
      href: `/glossary/${slug}`,
      publishedAt: frontmatter.publishedAt,
    })
  }

  return NextResponse.json(results, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
