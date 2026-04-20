import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Debate',
  description:
    'The contested questions in public policy — mapped with the best arguments on each side.',
}

export default function DebatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Debate"
        title="Questions with no easy answers"
        description="These are the contested policy questions where the evidence is genuinely mixed and reasonable people disagree. We map the strongest arguments on each side."
      />
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        <p className="text-body-lg text-slate-600 mb-10 max-w-prose">
          This section is coming soon. We are building structured debate pages for the most
          important contested questions in housing, climate, health, and democratic reform.
        </p>
        <div className="flex flex-wrap gap-4">
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
