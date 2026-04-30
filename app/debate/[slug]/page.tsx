import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContentBySlug, getAllContent } from '@/lib/content'
import type { Debate } from '@/lib/types/content'
import { renderMarkdown, extractToc } from '@/lib/markdown'
import { generatePageMetadata, siteMetadata } from '@/lib/metadata'
import CitationList from '@/components/ui/CitationList'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const items = getAllContent<Debate>('debate')
  return items.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getContentBySlug<Debate>('debate', slug)
  if (!item) return {}
  const { frontmatter } = item
  return generatePageMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    canonicalUrl: `${siteMetadata.siteUrl}/debate/${slug}`,
  })
}

export default async function DebateDetailPage({ params }: Props) {
  const { slug } = await params
  const item = getContentBySlug<Debate>('debate', slug)
  if (!item) notFound()

  const { frontmatter, content } = item
  const toc = extractToc(content)
  const htmlContent = renderMarkdown(content)
  const citations = frontmatter.citations ?? []
  const positions = frontmatter.positions ?? []

  return (
    <div className="bg-brand-cream">
      {/* Page header */}
      <div className="bg-brand-navy text-white py-14 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/debate"
            className="text-white/60 hover:text-white text-label-sm uppercase tracking-wider mb-6 inline-block"
          >
            ← Active Debates
          </Link>
          <p className="eyebrow text-brand-amber mb-3">{frontmatter.topic}</p>
          <h1 className="font-serif text-display-md md:text-display-lg mb-4 max-w-3xl">
            {frontmatter.question}
          </h1>
          {frontmatter.description && (
            <p className="text-white/80 text-body-lg max-w-2xl">{frontmatter.description}</p>
          )}
          <p className="text-white/40 text-label-sm mt-5">
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
            {/* Positions */}
            {positions.length > 0 && (
              <section className="mb-12" aria-labelledby="positions-heading">
                <h2
                  id="positions-heading"
                  className="font-serif text-heading-lg text-brand-navy mb-6"
                >
                  The positions
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {positions.map((position, i) => (
                    <div
                      key={position.label}
                      className={`card-base p-6 border-t-4 ${i === 0 ? 'border-t-brand-blue' : 'border-t-brand-amber'}`}
                    >
                      <p
                        className={`text-label-sm uppercase font-semibold mb-2 ${i === 0 ? 'text-brand-blue' : 'text-brand-amber'}`}
                      >
                        {position.label}
                      </p>
                      {position.summary && (
                        <p className="text-body-sm text-slate-600 leading-relaxed mb-4">
                          {position.summary}
                        </p>
                      )}
                      {position.arguments && position.arguments.length > 0 && (
                        <ul className="space-y-2.5">
                          {position.arguments.map((arg) => (
                            <li key={arg} className="flex gap-2 text-body-sm text-slate-700">
                              <span className="text-slate-400 mt-0.5 flex-shrink-0">–</span>
                              {arg}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Markdown body */}
            <div
              className="prose prose-civic max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Citations */}
            {citations.length > 0 && <CitationList citations={citations} />}

            <div className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap gap-6 items-center justify-between">
              <Link href="/debate" className="text-brand-blue hover:underline text-label-sm">
                ← All Debates
              </Link>
              <Link href="/policy" className="text-brand-blue hover:underline text-label-sm">
                Browse Policy Paths →
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

            {/* Positions summary */}
            {positions.length > 0 && (
              <div>
                <p className="eyebrow mb-3">Positions in this debate</p>
                <ul className="space-y-2 list-none p-0">
                  {positions.map((position) => (
                    <li key={position.label}>
                      <span className="text-body-sm text-slate-700">{position.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related policy */}
            {frontmatter.relatedPolicy && frontmatter.relatedPolicy.length > 0 && (
              <div>
                <p className="eyebrow mb-3">Related Policy Paths</p>
                <ul className="space-y-2 list-none p-0">
                  {frontmatter.relatedPolicy.map((policySlug) => (
                    <li key={policySlug}>
                      <Link
                        href={`/policy/${policySlug}`}
                        className="text-body-sm text-brand-blue hover:underline"
                      >
                        {policySlug
                          .split('-')
                          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(' ')}
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
