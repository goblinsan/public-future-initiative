import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Trust Center',
  description:
    'Our editorial standards, methodology, funding, and corrections policy — all in one place.',
}

const principles = [
  {
    title: 'Non-partisan',
    description: 'We have no political affiliation and accept no funding from political parties or government bodies.',
  },
  {
    title: 'Evidence ratings',
    description: 'Every policy claim is rated: strong, moderate, emerging, or contested. We never flatten uncertainty.',
  },
  {
    title: 'Source transparency',
    description: 'Every factual claim links to its source. We cite peer-reviewed research, official statistics, and recognised expert bodies.',
  },
  {
    title: 'Corrections',
    description: 'When we get something wrong, we correct it publicly and log the change. No stealth edits.',
  },
  {
    title: 'Open methodology',
    description: 'Our editorial process, scoring criteria, and content model are publicly documented.',
  },
  {
    title: 'Independent funding',
    description: 'We are funded by individual donors and charitable foundations. Full funder disclosure is published annually.',
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
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {principles.map(({ title, description }) => (
            <div key={title} className="bg-white rounded-card border border-slate-200 shadow-card p-6">
              <h3 className="font-semibold text-heading-sm text-brand-navy mb-2">{title}</h3>
              <p className="text-body-sm text-slate-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/corrections" className="btn-outline">
            Corrections log
          </Link>
          <Link href="/about" className="btn-outline">
            About us
          </Link>
        </div>
      </section>
    </>
  )
}
