import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import CTAPanel from '@/components/ui/CTAPanel'
import ActionsDirectory from '@/components/actions/ActionsDirectory'
import { getAllContent } from '@/lib/content'
import type { Action } from '@/lib/types/content'

export const metadata: Metadata = {
  title: 'Take Action',
  description:
    'Campaigns, events, volunteering, and toolkits — practical next steps to participate in pilots, support advocacy, and take informed civic action.',
}

const participationPaths = [
  {
    icon: '📣',
    title: 'Campaigns',
    description: 'Add your voice to active campaigns pushing for evidence-based policy change.',
    filter: 'campaign',
  },
  {
    icon: '📅',
    title: 'Events',
    description: 'Attend a structured discussion, town hall, or online session near you.',
    filter: 'event',
  },
  {
    icon: '🙋',
    title: 'Volunteer',
    description: 'Facilitate community discussions, help evaluate pilots, or support our work.',
    filter: 'volunteer',
  },
  {
    icon: '📍',
    title: 'Local Action',
    description: 'Host a discussion or support a local initiative in your community.',
    filter: 'local-action',
  },
  {
    icon: '🛠️',
    title: 'Toolkits',
    description: 'Step-by-step guides for writing to representatives, briefing groups, and more.',
    filter: 'toolkit',
  },
  {
    icon: '📝',
    title: 'Get Involved',
    description: 'Register as a volunteer, partner, or local organiser — or submit a pilot.',
    href: '/get-involved',
  },
]

export default function ActionsPage() {
  const items = getAllContent<Action>('actions')

  return (
    <div className="bg-brand-cream">
      <PageHeader
        eyebrow="Take Action"
        title="Turn interest into real-world next steps"
        description="Whether you want to campaign, host a conversation, volunteer, or simply contact your representative — here is where to start."
      />

      {/* Participation pathway tiles */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-14">
        <p className="eyebrow mb-6">Ways to participate</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {participationPaths.map(({ icon, title, description, filter, href }) => (
            <Link
              key={title}
              href={href ?? `#browse`}
              className="group flex gap-4 items-start bg-white rounded-card border border-slate-200 shadow-card p-5 hover:shadow-card-hover hover:border-brand-blue/30 transition-all"
            >
              <span className="text-2xl leading-none mt-0.5 flex-shrink-0" aria-hidden>
                {icon}
              </span>
              <div>
                <h3 className="font-semibold text-heading-sm text-brand-navy group-hover:text-brand-blue transition-colors mb-1">
                  {title}
                </h3>
                <p className="text-body-sm text-slate-600">{description}</p>
                {filter && (
                  <p className="mt-2 text-label-sm text-brand-blue">
                    Browse {title.toLowerCase()} →
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse all actions */}
      <section id="browse" className="max-w-5xl mx-auto px-6 md:px-10 pb-14">
        <div className="border-t border-slate-200 pt-12">
          <p className="eyebrow mb-2">Browse all actions</p>
          <h2 className="font-serif text-display-md text-brand-navy mb-8">
            Find your next step
          </h2>

          {items.length > 0 ? (
            <ActionsDirectory actions={items} />
          ) : (
            <p className="text-slate-500">No actions published yet.</p>
          )}
        </div>
      </section>

      {/* Get involved CTA */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pb-16">
        <CTAPanel
          variant="navy"
          title="Ready to get more involved?"
          description="Register as a volunteer, partner, local organiser, or submit a pilot or resource for consideration."
          primaryCTA={{ label: 'Register your interest', href: '/get-involved' }}
          secondaryCTA={{ label: 'Browse toolkits', href: '#browse' }}
        />
      </section>

      {/* Cross-links */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pb-16">
        <div className="grid sm:grid-cols-3 gap-6 border-t border-slate-200 pt-12">
          <div className="bg-white rounded-card border border-slate-200 p-6">
            <p className="eyebrow mb-2">Context</p>
            <h3 className="font-semibold text-brand-navy mb-1 text-heading-sm">
              What&apos;s Changing
            </h3>
            <p className="text-body-sm text-slate-600 mb-4">
              Understand the issues before you act — evidence-based explainers without the jargon.
            </p>
            <Link href="/explainers" className="text-label-sm text-brand-blue hover:underline">
              Read explainers →
            </Link>
          </div>
          <div className="bg-white rounded-card border border-slate-200 p-6">
            <p className="eyebrow mb-2">Evidence</p>
            <h3 className="font-semibold text-brand-navy mb-1 text-heading-sm">Pilots & Results</h3>
            <p className="text-body-sm text-slate-600 mb-4">
              See what&apos;s been tried, what worked, and where participation opportunities exist.
            </p>
            <Link href="/pilots" className="text-label-sm text-brand-blue hover:underline">
              See pilots →
            </Link>
          </div>
          <div className="bg-white rounded-card border border-slate-200 p-6">
            <p className="eyebrow mb-2">Policy</p>
            <h3 className="font-semibold text-brand-navy mb-1 text-heading-sm">Policy Paths</h3>
            <p className="text-body-sm text-slate-600 mb-4">
              Know the options before you advocate — every major approach with its evidence and trade-offs.
            </p>
            <Link href="/policy" className="text-label-sm text-brand-blue hover:underline">
              Explore policy →
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <Link href="/" className="text-brand-blue hover:underline text-label-sm">
            ← Back to home
          </Link>
        </div>
      </section>
    </div>
  )
}
