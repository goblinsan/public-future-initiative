import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import TimelineBlock from '@/components/ui/TimelineBlock'
import { getAllContent } from '@/lib/content'
import type { TimelineEvent as TimelineEventContent } from '@/lib/types/content'

export const metadata: Metadata = {
  title: 'Timeline',
  description:
    "A chronology of the economic, labor, and technology shifts that frame today's debates about AI and the future of work.",
}

export default function TimelinePage() {
  const items = getAllContent<TimelineEventContent>('timeline')

  // Sort by publishedAt ascending (oldest first) for chronological display
  const sortedItems = [...items].sort((a, b) => {
    const dateA = a.frontmatter.publishedAt ?? ''
    const dateB = b.frontmatter.publishedAt ?? ''
    return dateA.localeCompare(dateB)
  })

  const events = sortedItems.map(({ frontmatter }) => ({
    year: frontmatter.year,
    title: frontmatter.title,
    description: frontmatter.description,
    location: frontmatter.location,
    outcome: frontmatter.outcome,
  }))

  return (
    <>
      <PageHeader
        eyebrow="History & Context"
        title="Timeline of the Economic Transition"
        description="A chronology of industrial shifts, policy responses, and technological milestones — from the first automation wave to the AI era."
      />
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        {events.length > 0 ? (
          <TimelineBlock events={events} />
        ) : (
          <p className="text-slate-500">No timeline entries published yet.</p>
        )}

        <div className="mt-16 border-t border-slate-200 pt-10 grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-card border border-slate-200 p-6">
            <p className="eyebrow mb-2">Explainers</p>
            <h3 className="font-semibold text-brand-navy mb-2 text-heading-sm">
              Understand the forces driving change
            </h3>
            <p className="text-body-sm text-slate-600 mb-4">
              Deep-dives on automation, AI, labor displacement, and why transition planning matters.
            </p>
            <Link href="/explainers" className="text-label-sm text-brand-blue hover:underline">
              Read explainers →
            </Link>
          </div>
          <div className="bg-white rounded-card border border-slate-200 p-6">
            <p className="eyebrow mb-2">Glossary</p>
            <h3 className="font-semibold text-brand-navy mb-2 text-heading-sm">
              Key terms and definitions
            </h3>
            <p className="text-body-sm text-slate-600 mb-4">
              Plain-language definitions of automation dividend, guaranteed income, portable
              benefits, and more.
            </p>
            <Link href="/glossary" className="text-label-sm text-brand-blue hover:underline">
              Browse glossary →
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
