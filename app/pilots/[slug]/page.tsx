import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, AlertTriangle } from 'lucide-react'
import { getContentBySlug, getAllContent } from '@/lib/content'
import type { Pilot } from '@/lib/types/content'
import { renderMarkdown, extractToc, slugToTitle } from '@/lib/markdown'
import { generatePageMetadata, siteMetadata } from '@/lib/metadata'
import EvidenceSummary from '@/components/ui/EvidenceSummary'
import type { EvidenceStrength } from '@/components/ui/EvidenceSummary'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const items = getAllContent<Pilot>('pilots')
  return items.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getContentBySlug<Pilot>('pilots', slug)
  if (!item) return {}
  const { frontmatter } = item
  return generatePageMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    canonicalUrl: `${siteMetadata.siteUrl}/pilots/${slug}`,
  })
}

const outcomeConfig: Record<
  NonNullable<Pilot['outcome']>,
  { label: string; color: string }
> = {
  ongoing: { label: 'Ongoing', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  success: { label: 'Success', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  partial: { label: 'Partial success', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  failed: {
    label: 'Did not achieve goals',
    color: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  cancelled: { label: 'Cancelled', color: 'bg-slate-100 text-slate-600 border-slate-200' },
}

export default async function PilotPage({ params }: Props) {
  const { slug } = await params
  const item = getContentBySlug<Pilot>('pilots', slug)
  if (!item) notFound()

  const { frontmatter, content } = item
  const toc = extractToc(content)
  const htmlContent = renderMarkdown(content)
  const citations = frontmatter.citations ?? []
  const outcome = frontmatter.outcome ? outcomeConfig[frontmatter.outcome] : null

  return (
    <div className="bg-brand-cream">
      {/* Page header */}
      <div className="bg-brand-navy text-white py-14 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/pilots"
            className="text-white/60 hover:text-white text-label-sm uppercase tracking-wider mb-6 inline-block"
          >
            ← Pilots &amp; Case Studies
          </Link>

          <div className="flex flex-wrap gap-2 mb-3">
            {frontmatter.theme?.map((t) => (
              <p key={t} className="eyebrow text-brand-amber">
                {t
                  .split('-')
                  .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ')}
              </p>
            ))}
          </div>

          <h1 className="font-serif text-display-md md:text-display-lg mb-4">
            {frontmatter.title}
          </h1>

          <p className="text-white/80 text-body-lg max-w-2xl mb-4">{frontmatter.description}</p>

          {/* Meta strip */}
          <div className="flex flex-wrap gap-4 items-center mt-4">
            <span className="text-white/60 text-label-sm flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" aria-hidden /> {frontmatter.location}
            </span>
            {frontmatter.startDate && (
              <span className="text-white/60 text-label-sm">
                {frontmatter.startDate.slice(0, 4)}
                {frontmatter.endDate
                  ? `–${frontmatter.endDate.slice(0, 4)}`
                  : '–present'}
              </span>
            )}
            {outcome && (
              <span
                className={`text-label-sm border px-2.5 py-1 rounded-sm ${outcome.color}`}
              >
                {outcome.label}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12 items-start">
          {/* Main content */}
          <article>
            {/* Partners */}
            {frontmatter.partners && frontmatter.partners.length > 0 && (
              <div className="card-base p-5 mb-8 bg-white">
                <p className="eyebrow mb-2">Partners &amp; Organisations</p>
                <p className="text-body-sm text-slate-700">
                  {frontmatter.partners.join(' · ')}
                </p>
              </div>
            )}

            {/* Narrative content */}
            <div
              className="prose prose-civic max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Limitations */}
            {frontmatter.limitations && frontmatter.limitations.length > 0 && (
              <div className="mt-10 card-base p-6 bg-rose-50/60 border-rose-200">
                <h2 className="text-heading-sm text-brand-navy mb-4">Limitations &amp; Caveats</h2>
                <ul className="space-y-2">
                  {frontmatter.limitations.map((item, i) => (
                    <li key={i} className="flex gap-2 text-body-sm text-slate-700">
                      <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lessons learned */}
            {frontmatter.lessonsLearned && frontmatter.lessonsLearned.length > 0 && (
              <div className="mt-8 card-base p-6 bg-brand-blue-muted/40 border-brand-blue/20">
                <h2 className="text-heading-sm text-brand-navy mb-4">Lessons Learned</h2>
                <ul className="space-y-2">
                  {frontmatter.lessonsLearned.map((lesson, i) => (
                    <li key={i} className="flex gap-2 text-body-sm text-slate-700">
                      <span className="flex-shrink-0 text-brand-blue mt-0.5">→</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Evidence summary */}
            {frontmatter.evidenceStrength && (
              <EvidenceSummary
                strength={frontmatter.evidenceStrength as EvidenceStrength}
                citations={citations}
              />
            )}

            {/* Engagement CTA */}
            {frontmatter.engagementUrl && (
              <div className="mt-10 card-base p-6 bg-white border-brand-blue/20">
                <p className="eyebrow mb-2">Get Involved</p>
                <p className="text-body-sm text-slate-700 mb-4">
                  Learn more or find ways to support or replicate this initiative.
                </p>
                <Link
                  href={frontmatter.engagementUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                >
                  Visit project site →
                </Link>
              </div>
            )}

            <div className="mt-10 pt-8 border-t border-slate-200">
              <Link href="/pilots" className="text-brand-blue hover:underline text-label-sm">
                ← All Pilots &amp; Case Studies
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

            {/* Related actions */}
            {frontmatter.relatedActions && frontmatter.relatedActions.length > 0 && (
              <div>
                <p className="eyebrow mb-3">Take Action</p>
                <ul className="space-y-2 list-none p-0">
                  {frontmatter.relatedActions.map((actionSlug) => (
                    <li key={actionSlug}>
                      <Link
                        href={`/actions/${actionSlug}`}
                        className="text-body-sm text-brand-blue hover:underline"
                      >
                        {slugToTitle(actionSlug)}
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

            {/* Outcome / quick facts */}
            <div className="card-base p-5 bg-white">
              <p className="eyebrow mb-3">Quick Facts</p>
              <dl className="space-y-3 text-body-sm">
                <div>
                  <dt className="text-label-sm text-brand-slate uppercase tracking-wider mb-0.5">
                    Location
                  </dt>
                  <dd className="text-slate-800">{frontmatter.location}</dd>
                </div>
                {frontmatter.region && (
                  <div>
                    <dt className="text-label-sm text-brand-slate uppercase tracking-wider mb-0.5">
                      Region
                    </dt>
                    <dd className="text-slate-800">{frontmatter.region}</dd>
                  </div>
                )}
                {frontmatter.startDate && (
                  <div>
                    <dt className="text-label-sm text-brand-slate uppercase tracking-wider mb-0.5">
                      Period
                    </dt>
                    <dd className="text-slate-800">
                      {frontmatter.startDate.slice(0, 4)}
                      {frontmatter.endDate
                        ? `–${frontmatter.endDate.slice(0, 4)}`
                        : '–present'}
                    </dd>
                  </div>
                )}
                {outcome && (
                  <div>
                    <dt className="text-label-sm text-brand-slate uppercase tracking-wider mb-0.5">
                      Outcome
                    </dt>
                    <dd>
                      <span
                        className={`text-label-sm border px-2 py-0.5 rounded-sm ${outcome.color}`}
                      >
                        {outcome.label}
                      </span>
                    </dd>
                  </div>
                )}
                {frontmatter.evidenceStrength && (
                  <div>
                    <dt className="text-label-sm text-brand-slate uppercase tracking-wider mb-0.5">
                      Evidence
                    </dt>
                    <dd className="text-slate-800 capitalize">{frontmatter.evidenceStrength}</dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
