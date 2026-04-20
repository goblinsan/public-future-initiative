import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import PilotsDirectory from '@/components/pilots/PilotsDirectory'
import { getAllContent } from '@/lib/content'
import type { Pilot } from '@/lib/types/content'

export const metadata: Metadata = {
  title: 'Pilots & Case Studies',
  description:
    'Real-world experiments, local initiatives, and community programmes — what was tried, what was learned, and where participation opportunities exist.',
}

export default function PilotsPage() {
  const items = getAllContent<Pilot>('pilots')

  return (
    <div className="bg-brand-cream">
      <PageHeader
        eyebrow="Pilots & Case Studies"
        title="What's being tried — and what we've learned"
        description="Evidence from real experiments, local initiatives, and community programmes. We show outcomes, limitations, and lessons honestly — grounded in what actually happened."
      />

      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        {items.length > 0 ? (
          <PilotsDirectory pilots={items} />
        ) : (
          <p className="text-slate-500">No pilots published yet.</p>
        )}

        {/* Cross-links */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6 border-t border-slate-200 pt-12">
          <div className="bg-white rounded-card border border-slate-200 p-6">
            <p className="eyebrow mb-2">Policy</p>
            <h3 className="font-semibold text-brand-navy mb-1 text-heading-sm">Policy Paths</h3>
            <p className="text-body-sm text-slate-600 mb-4">
              Explore the policy options that these pilots inform and support.
            </p>
            <Link href="/policy" className="text-label-sm text-brand-blue hover:underline">
              Explore policy →
            </Link>
          </div>
          <div className="bg-white rounded-card border border-slate-200 p-6">
            <p className="eyebrow mb-2">Context</p>
            <h3 className="font-semibold text-brand-navy mb-1 text-heading-sm">
              What&apos;s Changing
            </h3>
            <p className="text-body-sm text-slate-600 mb-4">
              Understand the forces driving the need for these experiments.
            </p>
            <Link href="/explainers" className="text-label-sm text-brand-blue hover:underline">
              Read explainers →
            </Link>
          </div>
          <div className="bg-white rounded-card border border-slate-200 p-6">
            <p className="eyebrow mb-2">Get Involved</p>
            <h3 className="font-semibold text-brand-navy mb-1 text-heading-sm">Take Action</h3>
            <p className="text-body-sm text-slate-600 mb-4">
              Find campaigns, events, and ways to support transition work near you.
            </p>
            <Link href="/actions" className="text-label-sm text-brand-blue hover:underline">
              See actions →
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-brand-blue hover:underline text-label-sm">
            ← Back to home
          </Link>
        </div>
      </section>
    </div>
  )
}
