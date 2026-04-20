import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContentBySlug, getAllContent } from '@/lib/content'
import type { Action } from '@/lib/types/content'
import { renderMarkdown, extractToc, slugToTitle } from '@/lib/markdown'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const items = getAllContent<Action>('actions')
  return items.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getContentBySlug<Action>('actions', slug)
  if (!item) return {}
  return {
    title: item.frontmatter.title,
    description: item.frontmatter.description,
  }
}

const actionTypeConfig: Record<
  NonNullable<Action['actionType']>,
  { label: string; icon: string; color: string }
> = {
  campaign: { label: 'Campaign', icon: '📣', color: 'bg-rose-50 text-rose-800 border-rose-200' },
  event: { label: 'Event', icon: '📅', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  petition: { label: 'Petition', icon: '✍️', color: 'bg-purple-50 text-purple-800 border-purple-200' },
  volunteer: { label: 'Volunteer', icon: '🙋', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  'local-action': { label: 'Local Action', icon: '📍', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  toolkit: { label: 'Toolkit', icon: '🛠️', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  other: { label: 'Other', icon: '✊', color: 'bg-brand-blue-muted text-brand-blue border-brand-blue/20' },
}

export default async function ActionPage({ params }: Props) {
  const { slug } = await params
  const item = getContentBySlug<Action>('actions', slug)
  if (!item) notFound()

  const { frontmatter, content } = item
  const toc = extractToc(content)
  const htmlContent = renderMarkdown(content)

  const typeConfig = frontmatter.actionType ? actionTypeConfig[frontmatter.actionType] : null
  const signupHref = frontmatter.signupUrl ?? frontmatter.url

  return (
    <div className="bg-brand-cream">
      {/* Page header */}
      <div className="bg-brand-navy text-white py-14 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/actions"
            className="text-white/60 hover:text-white text-label-sm uppercase tracking-wider mb-6 inline-block"
          >
            ← Take Action
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {typeConfig && (
              <span className={`text-label-sm border px-2.5 py-1 rounded-sm ${typeConfig.color}`}>
                {typeConfig.icon} {typeConfig.label}
              </span>
            )}
            {frontmatter.isRemote && (
              <span className="text-label-sm border border-white/30 text-white/80 px-2.5 py-1 rounded-sm">
                Remote / online
              </span>
            )}
          </div>

          <h1 className="font-serif text-display-md md:text-display-lg mb-4">
            {frontmatter.title}
          </h1>

          <p className="text-white/80 text-body-lg max-w-2xl mb-6">{frontmatter.description}</p>

          {/* Meta strip */}
          <div className="flex flex-wrap gap-4 items-center">
            {frontmatter.location && !frontmatter.isRemote && (
              <span className="text-white/60 text-label-sm">📍 {frontmatter.location}</span>
            )}
            {frontmatter.startDate && (
              <span className="text-white/60 text-label-sm">
                📅{' '}
                {frontmatter.startDate.slice(0, 10)}
                {frontmatter.endDate ? ` – ${frontmatter.endDate.slice(0, 10)}` : ''}
              </span>
            )}
            {(frontmatter.organizer || frontmatter.partner) && (
              <span className="text-white/60 text-label-sm">
                🏢 {frontmatter.organizer}
                {frontmatter.partner ? ` · ${frontmatter.partner}` : ''}
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
            {/* Action steps */}
            {frontmatter.steps && frontmatter.steps.length > 0 && (
              <div className="card-base p-6 bg-white mb-8">
                <p className="eyebrow mb-4">How to participate</p>
                <ol className="space-y-3">
                  {frontmatter.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-body-sm text-slate-700">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue text-white text-label-sm flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Schedule */}
            {frontmatter.schedule && (
              <div className="card-base p-5 bg-amber-50/60 border-amber-200 mb-8">
                <p className="eyebrow mb-1">Schedule &amp; Timing</p>
                <p className="text-body-sm text-slate-700">{frontmatter.schedule}</p>
              </div>
            )}

            {/* Narrative content */}
            <div
              className="prose prose-civic max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Signup CTA */}
            {signupHref && (
              <div className="mt-10 card-base p-6 bg-white border-brand-blue/20">
                <p className="eyebrow mb-2">Ready to participate?</p>
                <p className="text-body-sm text-slate-700 mb-4">
                  {frontmatter.actionType === 'event'
                    ? 'Register your place — spaces may be limited.'
                    : frontmatter.actionType === 'volunteer'
                      ? 'Express your interest and we\'ll be in touch with next steps.'
                      : frontmatter.actionType === 'toolkit'
                        ? 'Use this toolkit in your community.'
                        : 'Take the next step and get involved.'}
                </p>
                <Link
                  href={signupHref}
                  target={signupHref.startsWith('http') ? '_blank' : undefined}
                  rel={signupHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="btn-primary inline-block"
                >
                  {frontmatter.actionType === 'event'
                    ? 'Register now →'
                    : frontmatter.actionType === 'volunteer'
                      ? 'Express interest →'
                      : frontmatter.actionType === 'toolkit'
                        ? 'Get started →'
                        : 'Join this action →'}
                </Link>
              </div>
            )}

            <div className="mt-10 pt-8 border-t border-slate-200">
              <Link href="/actions" className="text-brand-blue hover:underline text-label-sm">
                ← All Actions
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

            {/* Quick details */}
            <div className="card-base p-5 bg-white">
              <p className="eyebrow mb-3">Quick Details</p>
              <dl className="space-y-3 text-body-sm">
                {typeConfig && (
                  <div>
                    <dt className="text-label-sm text-brand-slate uppercase tracking-wider mb-0.5">
                      Type
                    </dt>
                    <dd className="text-slate-800">
                      {typeConfig.icon} {typeConfig.label}
                    </dd>
                  </div>
                )}
                {frontmatter.location && (
                  <div>
                    <dt className="text-label-sm text-brand-slate uppercase tracking-wider mb-0.5">
                      Location
                    </dt>
                    <dd className="text-slate-800">{frontmatter.location}</dd>
                  </div>
                )}
                {frontmatter.isRemote && (
                  <div>
                    <dt className="text-label-sm text-brand-slate uppercase tracking-wider mb-0.5">
                      Format
                    </dt>
                    <dd className="text-slate-800">Remote / online</dd>
                  </div>
                )}
                {frontmatter.startDate && (
                  <div>
                    <dt className="text-label-sm text-brand-slate uppercase tracking-wider mb-0.5">
                      {frontmatter.endDate ? 'Period' : 'Starting'}
                    </dt>
                    <dd className="text-slate-800">
                      {frontmatter.startDate.slice(0, 10)}
                      {frontmatter.endDate ? ` – ${frontmatter.endDate.slice(0, 10)}` : ''}
                    </dd>
                  </div>
                )}
                {frontmatter.organizer && (
                  <div>
                    <dt className="text-label-sm text-brand-slate uppercase tracking-wider mb-0.5">
                      Organiser
                    </dt>
                    <dd className="text-slate-800">{frontmatter.organizer}</dd>
                  </div>
                )}
                {frontmatter.partner && (
                  <div>
                    <dt className="text-label-sm text-brand-slate uppercase tracking-wider mb-0.5">
                      Partner
                    </dt>
                    <dd className="text-slate-800">{frontmatter.partner}</dd>
                  </div>
                )}
              </dl>

              {signupHref && (
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <Link
                    href={signupHref}
                    target={signupHref.startsWith('http') ? '_blank' : undefined}
                    rel={signupHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="btn-primary w-full text-center text-label-sm"
                  >
                    {frontmatter.actionType === 'event' ? 'Register →' : 'Get involved →'}
                  </Link>
                </div>
              )}
            </div>

            {/* Related explainers */}
            {frontmatter.relatedExplainers && frontmatter.relatedExplainers.length > 0 && (
              <div>
                <p className="eyebrow mb-3">Background Reading</p>
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
