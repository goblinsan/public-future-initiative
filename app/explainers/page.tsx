import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import { getAllContent } from '@/lib/content'
import type { Explainer } from '@/lib/types/content'

export const metadata: Metadata = {
  title: "What's Changing",
  description:
    'Evidence-based explainers on automation, AI, labor displacement, and why transition planning matters.',
}

export default function ExplainersPage() {
  const items = getAllContent<Explainer>('explainers')

  return (
    <>
      <PageHeader
        eyebrow="What's Changing"
        title="Understanding the AI-Shaped Economy"
        description="Clear, evidence-based breakdowns of the forces reshaping work, ownership, and economic life — written for serious readers and policy conversations."
      />
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        {items.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {items.map(({ slug, frontmatter }) => (
              <Card
                key={slug}
                href={`/explainers/${slug}`}
                title={frontmatter.title}
                description={frontmatter.description}
                tags={frontmatter.tags}
                meta={frontmatter.publishedAt}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No explainers published yet.</p>
        )}

        {/* Cross-links */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6 border-t border-slate-200 pt-12">
          <div className="bg-white rounded-card border border-slate-200 p-6">
            <p className="eyebrow mb-2">Reference</p>
            <h3 className="font-semibold text-brand-navy mb-1 text-heading-sm">Glossary</h3>
            <p className="text-body-sm text-slate-600 mb-4">
              Definitions of key terms like automation dividend, portable benefits, and care economy.
            </p>
            <Link href="/glossary" className="text-label-sm text-brand-blue hover:underline">
              Browse glossary →
            </Link>
          </div>
          <div className="bg-white rounded-card border border-slate-200 p-6">
            <p className="eyebrow mb-2">History</p>
            <h3 className="font-semibold text-brand-navy mb-1 text-heading-sm">Timeline</h3>
            <p className="text-body-sm text-slate-600 mb-4">
              A chronology of the economic, labor, and technology shifts that frame today&apos;s debates.
            </p>
            <Link href="/timeline" className="text-label-sm text-brand-blue hover:underline">
              View timeline →
            </Link>
          </div>
          <div className="bg-white rounded-card border border-slate-200 p-6">
            <p className="eyebrow mb-2">Policy</p>
            <h3 className="font-semibold text-brand-navy mb-1 text-heading-sm">Policy Paths</h3>
            <p className="text-body-sm text-slate-600 mb-4">
              Evidence-graded policy options for responding to the transition.
            </p>
            <Link href="/policy" className="text-label-sm text-brand-blue hover:underline">
              Explore policy →
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-brand-blue hover:underline text-label-sm">
            &larr; Back to home
          </Link>
        </div>
      </section>
    </>
  )
}
