import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import { getAllContent } from '@/lib/content'
import type { Debate } from '@/lib/types/content'

export const metadata: Metadata = {
  title: 'Debate',
  description:
    'The contested questions in public policy — mapped with the best arguments on each side.',
}

export default function DebatePage() {
  const debates = getAllContent<Debate>('debate')

  return (
    <>
      <PageHeader
        eyebrow="Debate"
        title="Questions with no easy answers"
        description="These are the contested policy questions where the evidence is genuinely mixed and reasonable people disagree. We map the strongest arguments on each side."
      />
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        {debates.length > 0 ? (
          <div className="space-y-5">
            {debates.map(({ slug, frontmatter }) => (
              <Link
                key={slug}
                href={`/debate/${slug}`}
                className="group block bg-white rounded-card border border-slate-200 shadow-card p-6 hover:shadow-card-hover hover:border-brand-blue/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-block flex-shrink-0 text-label-sm uppercase text-brand-blue bg-brand-blue-muted px-2.5 py-1 rounded-sm mt-0.5">
                    {frontmatter.topic}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-heading-md text-brand-navy mb-3 group-hover:text-brand-blue transition-colors">
                      {frontmatter.question}
                    </p>
                    {frontmatter.positions && frontmatter.positions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {frontmatter.positions.map((p) => (
                          <span
                            key={p.label}
                            className="text-label-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-sm"
                          >
                            {p.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-body-lg text-slate-600 mb-10 max-w-prose">
            This section is coming soon. We are building structured debate pages for the most
            important contested questions in housing, climate, health, and democratic reform.
          </p>
        )}
        <div className="flex flex-wrap gap-4 mt-10">
          <Link href="/policy" className="btn-primary">
            Browse Policy Paths
          </Link>
          <Link href="/" className="btn-outline">
            Back to Home
          </Link>
        </div>
      </section>
    </>
  )
}
