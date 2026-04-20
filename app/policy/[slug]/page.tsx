import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContentBySlug, getAllContent } from '@/lib/content'
import type { PolicyOption } from '@/lib/types/content'
import { renderMarkdown, extractToc, slugToTitle } from '@/lib/markdown'
import CitationList from '@/components/ui/CitationList'
import FAQItem from '@/components/ui/FAQItem'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const items = getAllContent<PolicyOption>('policy')
  return items.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getContentBySlug<PolicyOption>('policy', slug)
  if (!item) return {}
  return {
    title: item.frontmatter.title,
    description: item.frontmatter.description,
  }
}

const evidenceConfig: Record<
  PolicyOption['evidenceStrength'],
  { label: string; color: string }
> = {
  strong: {
    label: 'Strong evidence',
    color: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  },
  moderate: {
    label: 'Moderate evidence',
    color: 'bg-blue-50 text-blue-800 border border-blue-200',
  },
  emerging: {
    label: 'Emerging evidence',
    color: 'bg-amber-50 text-amber-800 border border-amber-200',
  },
  contested: {
    label: 'Contested',
    color: 'bg-rose-50 text-rose-800 border border-rose-200',
  },
}

const contentLabelConfig: Record<
  NonNullable<PolicyOption['contentLabel']>,
  string
> = {
  explainer: 'Explainer',
  analysis: 'Analysis',
  'policy-brief': 'Policy Brief',
  'debate-summary': 'Debate Summary',
}

export default async function PolicyDetailPage({ params }: Props) {
  const { slug } = await params
  const item = getContentBySlug<PolicyOption>('policy', slug)
  if (!item) notFound()

  const { frontmatter, content } = item
  const toc = extractToc(content)
  const htmlContent = renderMarkdown(content)
  const citations = frontmatter.citations ?? []
  const faqs = frontmatter.faqs ?? []
  const tradeoffs = frontmatter.tradeoffs
  const evidenceStrength = frontmatter.evidenceStrength ?? 'emerging'
  const { label: evidenceLabel, color: evidenceColor } =
    evidenceConfig[evidenceStrength]

  return (
    <div className="bg-brand-cream">
      {/* Page header */}
      <div className="bg-brand-navy text-white py-14 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/policy"
            className="text-white/60 hover:text-white text-label-sm uppercase tracking-wider mb-6 inline-block"
          >
            ← Policy Paths
          </Link>
          {frontmatter.contentLabel && (
            <p className="eyebrow text-brand-amber mb-3">
              {contentLabelConfig[frontmatter.contentLabel]}
            </p>
          )}
          <h1 className="font-serif text-display-md md:text-display-lg mb-4">
            {frontmatter.title}
          </h1>
          {(frontmatter.summary ?? frontmatter.description) && (
            <p className="text-white/80 text-body-lg max-w-2xl">
              {frontmatter.summary ?? frontmatter.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <span
              className={`text-label-sm px-2.5 py-1 rounded-sm font-medium ${evidenceColor}`}
            >
              {evidenceLabel}
            </span>
            <span className="text-white/50 text-label-sm">
              Published {frontmatter.publishedAt}
              {frontmatter.updatedAt && ` · Updated ${frontmatter.updatedAt}`}
            </span>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12 items-start">
          {/* Main content */}
          <article>
            {/* Problem & solution summary */}
            {(frontmatter.problemStatement || frontmatter.proposedSolution) && (
              <div className="grid sm:grid-cols-2 gap-5 mb-10">
                {frontmatter.problemStatement && (
                  <div className="card-base p-6">
                    <p className="eyebrow text-brand-amber mb-2">Problem addressed</p>
                    <p className="text-body-sm text-slate-700 leading-relaxed">
                      {frontmatter.problemStatement}
                    </p>
                  </div>
                )}
                {frontmatter.proposedSolution && (
                  <div className="card-base p-6">
                    <p className="eyebrow text-brand-blue mb-2">Proposed solution</p>
                    <p className="text-body-sm text-slate-700 leading-relaxed">
                      {frontmatter.proposedSolution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Markdown body */}
            <div
              className="prose prose-civic max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Tradeoffs */}
            {tradeoffs && (tradeoffs.pros?.length || tradeoffs.cons?.length) ? (
              <section className="mt-12" aria-labelledby="tradeoffs-heading">
                <h2
                  id="tradeoffs-heading"
                  className="font-serif text-heading-lg text-brand-navy mb-6"
                >
                  Tradeoffs
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {tradeoffs.pros && tradeoffs.pros.length > 0 && (
                    <div className="card-base p-6">
                      <p className="text-label-sm uppercase text-emerald-700 mb-3">
                        Strengths
                      </p>
                      <ul className="space-y-2.5">
                        {tradeoffs.pros.map((pro) => (
                          <li key={pro} className="flex gap-2 text-body-sm text-slate-700">
                            <span className="text-emerald-600 mt-0.5 flex-shrink-0">✓</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tradeoffs.cons && tradeoffs.cons.length > 0 && (
                    <div className="card-base p-6">
                      <p className="text-label-sm uppercase text-rose-700 mb-3">
                        Concerns & trade-offs
                      </p>
                      <ul className="space-y-2.5">
                        {tradeoffs.cons.map((con) => (
                          <li key={con} className="flex gap-2 text-body-sm text-slate-700">
                            <span className="text-rose-500 mt-0.5 flex-shrink-0">–</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            ) : null}

            {/* FAQs / Objections */}
            {faqs.length > 0 && (
              <section className="mt-12" aria-labelledby="faq-heading">
                <h2
                  id="faq-heading"
                  className="font-serif text-heading-lg text-brand-navy mb-2"
                >
                  Common questions
                </h2>
                <p className="text-body-sm text-slate-500 mb-6">
                  Objections, open questions, and implementation concerns.
                </p>
                <div className="border-t border-slate-200">
                  {faqs.map((faq) => (
                    <FAQItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Citations */}
            {citations.length > 0 && <CitationList citations={citations} />}

            <div className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap gap-6 items-center justify-between">
              <Link href="/policy" className="text-brand-blue hover:underline text-label-sm">
                ← All Policy Paths
              </Link>
              <Link
                href="/policy/compare"
                className="text-brand-blue hover:underline text-label-sm"
              >
                Compare policy options →
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

            {/* Evidence strength */}
            <div>
              <p className="eyebrow mb-3">Evidence quality</p>
              <span
                className={`inline-block text-label-sm px-2.5 py-1 rounded-sm font-medium ${evidenceColor}`}
              >
                {evidenceLabel}
              </span>
              <p className="text-body-sm text-slate-500 mt-2 leading-snug">
                This rating reflects the breadth and rigor of published research on this policy.
              </p>
            </div>

            {/* Related explainers */}
            {frontmatter.relatedExplainers && frontmatter.relatedExplainers.length > 0 && (
              <div>
                <p className="eyebrow mb-3">Related Explainers</p>
                <ul className="space-y-2 list-none p-0">
                  {frontmatter.relatedExplainers.map((explainerSlug) => (
                    <li key={explainerSlug}>
                      <Link
                        href={`/explainers/${explainerSlug}`}
                        className="text-body-sm text-brand-blue hover:underline"
                      >
                        {slugToTitle(explainerSlug)}
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
