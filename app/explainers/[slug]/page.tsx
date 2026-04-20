import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContentBySlug, getAllContent } from '@/lib/content'
import type { Explainer } from '@/lib/types/content'
import { renderMarkdown, extractToc, slugToTitle } from '@/lib/markdown'
import { generatePageMetadata, siteMetadata } from '@/lib/metadata'
import CitationList from '@/components/ui/CitationList'
import NewsletterSignup from '@/components/ui/NewsletterSignup'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const items = getAllContent<Explainer>('explainers')
  return items.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getContentBySlug<Explainer>('explainers', slug)
  if (!item) return {}
  const { frontmatter } = item
  return generatePageMetadata({
    title: frontmatter.title,
    description: frontmatter.description ?? frontmatter.summary,
    canonicalUrl: `${siteMetadata.siteUrl}/explainers/${slug}`,
  })
}

export default async function ExplainerPage({ params }: Props) {
  const { slug } = await params
  const item = getContentBySlug<Explainer>('explainers', slug)
  if (!item) notFound()

  const { frontmatter, content } = item
  const toc = extractToc(content)
  const htmlContent = renderMarkdown(content)
  const citations = frontmatter.citations ?? []

  return (
    <div className="bg-brand-cream">
      {/* Page header */}
      <div className="bg-brand-navy text-white py-14 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/explainers"
            className="text-white/60 hover:text-white text-label-sm uppercase tracking-wider mb-6 inline-block"
          >
            ← Explainers
          </Link>
          <p className="eyebrow text-brand-amber mb-3">Explainer</p>
          <h1 className="font-serif text-display-md md:text-display-lg mb-4">
            {frontmatter.title}
          </h1>
          {frontmatter.summary && (
            <p className="text-white/80 text-body-lg max-w-2xl">{frontmatter.summary}</p>
          )}
          <p className="text-white/50 text-label-sm mt-4">
            Published {frontmatter.publishedAt}
            {frontmatter.updatedAt && ` · Updated ${frontmatter.updatedAt}`}
          </p>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12 items-start">
          {/* Main content */}
          <article>
            <div
              className="prose prose-civic max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Citations / sources */}
            {citations.length > 0 && <CitationList citations={citations} />}

            {/* Inline newsletter signup */}
            <div className="mt-12 pt-10 border-t border-slate-200">
              <NewsletterSignup location="explainer-inline" />
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200">
              <Link href="/explainers" className="text-brand-blue hover:underline text-label-sm">
                ← All Explainers
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block sticky top-8 space-y-8">
            {/* Table of contents */}
            {toc.length > 0 && (
              <nav aria-label="On this page">
                <p className="eyebrow mb-3">On this page</p>
                <ol className="space-y-2 list-none p-0">
                  {toc.map((entry) => (
                    <li key={entry.id} className={entry.depth === 3 ? 'pl-4' : ''}>
                      <a
                        href={`#${entry.id}`}
                        className="text-body-sm text-brand-slate hover:text-brand-blue transition-colors"
                      >
                        {entry.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Related policy */}
            {frontmatter.relatedPolicy && frontmatter.relatedPolicy.length > 0 && (
              <div>
                <p className="eyebrow mb-3">Related Policy</p>
                <ul className="space-y-2 list-none p-0">
                  {frontmatter.relatedPolicy.map((policySlug) => (
                    <li key={policySlug}>
                      <Link
                        href={`/policy/${policySlug}`}
                        className="text-body-sm text-brand-blue hover:underline"
                      >
                        {slugToTitle(policySlug)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related pilots */}
            {frontmatter.relatedPilots && frontmatter.relatedPilots.length > 0 && (
              <div>
                <p className="eyebrow mb-3">Related Pilots</p>
                <ul className="space-y-2 list-none p-0">
                  {frontmatter.relatedPilots.map((pilotSlug) => (
                    <li key={pilotSlug}>
                      <Link
                        href={`/pilots/${pilotSlug}`}
                        className="text-body-sm text-brand-blue hover:underline"
                      >
                        {slugToTitle(pilotSlug)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div>
                <p className="eyebrow mb-3">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-brand-blue-muted text-brand-blue text-label-sm px-2.5 py-0.5 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
