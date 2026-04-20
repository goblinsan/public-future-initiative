import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import { getAllContent } from '@/lib/content'
import type { PolicyOption } from '@/lib/types/content'

export const metadata: Metadata = {
  title: 'Policy Paths',
  description: 'Concrete policy options for responding to economic and technological change — with evidence, trade-offs, and open questions.',
}

const evidenceBadge: Record<PolicyOption['evidenceStrength'], { label: string; color: string }> = {
  strong: { label: 'Strong evidence', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  moderate: { label: 'Moderate evidence', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  emerging: { label: 'Emerging evidence', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  contested: { label: 'Contested', color: 'bg-rose-50 text-rose-800 border-rose-200' },
}

const contentLabelText: Record<NonNullable<PolicyOption['contentLabel']>, string> = {
  explainer: 'Explainer',
  analysis: 'Analysis',
  'policy-brief': 'Policy Brief',
  'debate-summary': 'Debate Summary',
}

export default function PolicyPage() {
  const items = getAllContent<PolicyOption>('policy')

  return (
    <div className="bg-brand-cream">
      <PageHeader
        eyebrow="Policy Paths"
        title="Options, evidence, and tradeoffs"
        description="We present realistic policy responses to economic and technological change — not advocacy, but honest analysis of what each path involves, what the evidence shows, and what remains genuinely uncertain."
      />

      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        {/* Compare CTA */}
        <div className="bg-white rounded-card border border-brand-blue/20 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="font-semibold text-brand-navy text-body-md">Compare policy paths</p>
            <p className="text-body-sm text-slate-500 mt-0.5">
              See major options side by side with strengths and tradeoffs.
            </p>
          </div>
          <Link href="/policy/compare" className="btn-primary whitespace-nowrap flex-shrink-0">
            Compare options →
          </Link>
        </div>

        {/* Content label key */}
        <div className="flex flex-wrap gap-3 mb-8">
          <p className="text-label-sm text-slate-500 self-center mr-1">Content type:</p>
          {Object.values(contentLabelText).map((label) => (
            <span key={label} className="text-label-sm bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-sm">
              {label}
            </span>
          ))}
        </div>

        {items.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {items.map(({ slug, frontmatter }) => {
              const evidence = evidenceBadge[frontmatter.evidenceStrength ?? 'emerging']
              return (
                <Link
                  key={slug}
                  href={`/policy/${slug}`}
                  className="card-base p-6 group hover:border-brand-blue/40 transition-colors block"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    {frontmatter.contentLabel && (
                      <p className="eyebrow text-brand-amber">
                        {contentLabelText[frontmatter.contentLabel]}
                      </p>
                    )}
                    {frontmatter.evidenceStrength && (
                      <span
                        className={`flex-shrink-0 text-label-sm border px-2 py-0.5 rounded-sm ${evidence.color}`}
                      >
                        {evidence.label}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-heading-md text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                    {frontmatter.title}
                  </h2>
                  <p className="text-body-sm text-slate-600 leading-relaxed mb-4">
                    {frontmatter.description}
                  </p>
                  {frontmatter.tags && frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {frontmatter.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-label-sm bg-brand-blue-muted text-brand-blue px-2 py-0.5 rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-label-sm text-slate-400 mt-4">
                    {frontmatter.publishedAt}
                    {frontmatter.updatedAt && ` · Updated ${frontmatter.updatedAt}`}
                  </p>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-slate-500">No policy options published yet.</p>
        )}

        <div className="mt-12">
          <Link href="/" className="text-brand-blue hover:underline text-label-sm">
            ← Back to home
          </Link>
        </div>
      </section>
    </div>
  )
}
