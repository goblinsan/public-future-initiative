import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllContent } from '@/lib/content'
import type { PolicyOption } from '@/lib/types/content'
import ComparisonGrid from '@/components/ui/ComparisonGrid'
import type { ComparisonItem } from '@/components/ui/ComparisonGrid'
import PageHeader from '@/components/ui/PageHeader'
import CTAPanel from '@/components/ui/CTAPanel'

export const metadata: Metadata = {
  title: 'Compare Policy Paths',
  description: 'Side-by-side comparison of major policy options for responding to automation and economic change — strengths, tradeoffs, and evidence.',
}

const evidenceBadge: Record<PolicyOption['evidenceStrength'], { label: string; color: string }> = {
  strong: { label: 'Strong evidence', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  moderate: { label: 'Moderate evidence', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  emerging: { label: 'Emerging evidence', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  contested: { label: 'Contested', color: 'bg-rose-50 text-rose-800 border-rose-200' },
}

export default function PolicyComparePage() {
  const items = getAllContent<PolicyOption>('policy')

  const comparisonItems: ComparisonItem[] = items.map(({ slug, frontmatter }) => {
    const evidence = evidenceBadge[frontmatter.evidenceStrength ?? 'emerging']
    return {
      title: frontmatter.title,
      description: frontmatter.summary ?? frontmatter.description,
      pros: frontmatter.tradeoffs?.pros,
      cons: frontmatter.tradeoffs?.cons,
      tag: evidence.label,
      href: `/policy/${slug}`,
    }
  })

  return (
    <div className="bg-brand-cream">
      <PageHeader
        eyebrow="Compare"
        title="Policy paths side by side"
        description="Major policy options for responding to automation and economic change, compared by strengths, tradeoffs, and quality of evidence. This is a starting point for evaluation — not a ranking."
      />

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        {/* Editorial note */}
        <div className="bg-white border border-slate-200 rounded-card px-6 py-5 mb-10 max-w-3xl">
          <p className="eyebrow text-brand-amber mb-2">How to read this</p>
          <p className="text-body-sm text-slate-700 leading-relaxed">
            Each option is presented with its core strengths and concerns. These reflect the
            state of evidence and analysis — not advocacy. Many options are complementary
            rather than mutually exclusive. Click any option to read the full analysis,
            including citations and open questions.
          </p>
        </div>

        {comparisonItems.length > 0 ? (
          <ComparisonGrid
            title="Policy options compared"
            items={comparisonItems}
          />
        ) : (
          <p className="text-slate-500">No policy options published yet.</p>
        )}

        {/* Bottom navigation */}
        <div className="mt-16">
          <CTAPanel
            title="Read the full analysis"
            description="Each policy page includes the evidence base, implementation challenges, common objections, and open questions — what we know and what remains uncertain."
            primaryCTA={{ label: 'Browse all policy paths', href: '/policy' }}
            secondaryCTA={{ label: 'Back to home', href: '/' }}
            variant="bordered"
          />
        </div>

        <div className="mt-8">
          <Link href="/policy" className="text-brand-blue hover:underline text-label-sm">
            ← All Policy Paths
          </Link>
        </div>
      </section>
    </div>
  )
}
