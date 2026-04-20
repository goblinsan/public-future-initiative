import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Trust Center',
  description:
    'Our editorial standards, methodology, funding, and corrections policy — all in one place.',
}

const trustPages = [
  {
    href: '/editorial-standards',
    title: 'Editorial Standards',
    description:
      'How we select topics, verify claims, assign evidence ratings, and handle corrections.',
    eyebrow: 'Standards',
  },
  {
    href: '/methodology',
    title: 'Methodology',
    description:
      'Our full documented methodology for explainers, policy analyses, pilot reports, and evidence ratings.',
    eyebrow: 'How we work',
  },
  {
    href: '/corrections',
    title: 'Corrections Log',
    description:
      'A public register of every correction made to content on this platform, with dates and descriptions.',
    eyebrow: 'Accountability',
  },
  {
    href: '/moderation',
    title: 'Moderation Policy',
    description:
      'How we handle community contributions and what standards we apply to participation.',
    eyebrow: 'Community',
  },
  {
    href: '/governance',
    title: 'Governance',
    description:
      'Our organisational structure, editorial independence policy, and accountability mechanisms.',
    eyebrow: 'Structure',
  },
  {
    href: '/partners',
    title: 'Funders & Partners',
    description:
      'A full disclosure of our funding sources and partner organisations. No funder influences our editorial decisions.',
    eyebrow: 'Transparency',
  },
  {
    href: '/privacy',
    title: 'Privacy Policy',
    description: 'How we handle personal data, cookies, and your privacy on this platform.',
    eyebrow: 'Privacy',
  },
  {
    href: '/about',
    title: 'About Us',
    description:
      'Our mission, values, team, and advisory board — the institution behind the platform.',
    eyebrow: 'Who we are',
  },
]

const principles = [
  {
    title: 'Non-partisan',
    description:
      'We have no political affiliation and accept no funding from political parties or government bodies.',
  },
  {
    title: 'Evidence ratings',
    description:
      'Every policy claim is rated: strong, moderate, emerging, or contested. We never flatten uncertainty.',
  },
  {
    title: 'Source transparency',
    description:
      'Every factual claim links to its source. We cite peer-reviewed research, official statistics, and recognised expert bodies.',
  },
  {
    title: 'Corrections',
    description:
      'When we get something wrong, we correct it publicly and log the change. No stealth edits.',
  },
  {
    title: 'Open methodology',
    description:
      'Our editorial process, scoring criteria, and content model are publicly documented.',
  },
  {
    title: 'Independent funding',
    description:
      'We are funded by individual donors and charitable foundations. Full funder disclosure is published annually.',
  },
]

export default function TrustCenterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust Center"
        title="How we work"
        description="Trust is built through transparency, not authority. Here is everything you need to evaluate our work."
      />

      {/* Principles */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pt-16 pb-12">
        <div className="max-w-2xl mb-10">
          <p className="eyebrow mb-3">Our commitments</p>
          <h2 className="font-serif text-display-md text-brand-navy mb-4">
            Six principles that govern everything we publish
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map(({ title, description }) => (
            <div
              key={title}
              className="bg-white rounded-card border border-slate-200 shadow-card p-6"
            >
              <h3 className="font-semibold text-heading-sm text-brand-navy mb-2">{title}</h3>
              <p className="text-body-sm text-slate-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust pages grid */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pb-16">
        <div className="max-w-2xl mb-10">
          <p className="eyebrow mb-3">Full documentation</p>
          <h2 className="font-serif text-display-md text-brand-navy mb-4">
            Everything documented, publicly
          </h2>
          <p className="text-body-lg text-slate-600">
            We do not ask you to take our word for it. Every aspect of how we work is documented
            below.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPages.map(({ href, title, description, eyebrow }) => (
            <Link
              key={href}
              href={href}
              className="group block bg-brand-cream border border-slate-200 rounded-card p-5 hover:border-brand-blue/50 hover:shadow-card transition-all"
            >
              <p className="eyebrow text-brand-slate/60 mb-2">{eyebrow}</p>
              <h3 className="font-semibold text-body-sm text-brand-navy mb-1.5 group-hover:text-brand-blue transition-colors">
                {title} →
              </h3>
              <p className="text-body-sm text-slate-500 leading-relaxed">{description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 border-t border-slate-200 pt-10">
          <p className="text-body-sm text-slate-500 max-w-2xl">
            Found an error? Concerned about our editorial conduct?{' '}
            <Link href="/contact" className="text-brand-blue hover:underline font-medium">
              Contact us
            </Link>
            . All formal complaints are logged and reviewed. Our response process is documented
            in our{' '}
            <Link href="/governance" className="text-brand-blue hover:underline font-medium">
              governance page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
