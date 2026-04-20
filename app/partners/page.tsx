import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Partners & Funders',
  description: 'Organisations and funders who support the Public Future Initiative.',
}

const fundingPrinciples = [
  {
    title: 'Full disclosure',
    description:
      'All funding sources are disclosed in our annual transparency report. We do not accept anonymous donations above threshold amounts.',
  },
  {
    title: 'No editorial conditions',
    description:
      'No funder receives any right to approve, block, or alter content as a condition of their support. This is written into all funding agreements.',
  },
  {
    title: 'No partisan funding',
    description:
      'We do not accept funding from political parties, electoral campaigns, or government departments.',
  },
  {
    title: 'No conflicted funding',
    description:
      'We do not accept funding from corporations, industries, or organisations with a direct material interest in specific policy areas we cover.',
  },
  {
    title: 'Transparent relationships',
    description:
      'Where we have partner relationships for events, research, or distribution, those relationships are disclosed on relevant content.',
  },
  {
    title: 'Annual audit',
    description:
      'Our accounts are independently audited annually. Audited accounts are published as part of our annual transparency report.',
  },
]

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Transparency"
        title="Partners &amp; Funders"
        description="We are transparent about who supports our work. No funder influences editorial decisions."
      />
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        {/* Funding model */}
        <div className="max-w-2xl mb-12">
          <p className="eyebrow mb-3">How we are funded</p>
          <h2 className="font-serif text-display-md text-brand-navy mb-4">
            Independent, transparent, and unconditional
          </h2>
          <p className="text-body-lg text-slate-600 leading-relaxed mb-4">
            Public Future Initiative is funded by a combination of individual donors and charitable
            foundations who support independent civic media. We do not carry advertising, accept
            sponsored content, or receive funding from political parties or government departments.
          </p>
          <p className="text-body-lg text-slate-600 leading-relaxed">
            Our funding model is designed to protect editorial independence. Every funding
            relationship is subject to the principles below, which are written into all agreements.
          </p>
        </div>

        {/* Principles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {fundingPrinciples.map(({ title, description }) => (
            <div
              key={title}
              className="bg-white border border-slate-200 rounded-card shadow-card p-6"
            >
              <h3 className="font-semibold text-heading-sm text-brand-navy mb-2">{title}</h3>
              <p className="text-body-sm text-slate-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Current funders */}
        <div className="mb-16">
          <p className="eyebrow mb-3">Current funders</p>
          <h2 className="font-serif text-display-md text-brand-navy mb-6">
            Funder disclosure
          </h2>
          <div className="border border-slate-200 rounded-card p-8 text-slate-500">
            <p className="text-body-sm mb-2">
              Individual funder details are published in our annual transparency report. The first
              report will be published following our inaugural operating year.
            </p>
            <p className="text-body-sm">
              If you are interested in supporting the Public Future Initiative,{' '}
              <Link href="/contact" className="text-brand-blue hover:underline">
                get in touch
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Partner organisations */}
        <div className="mb-16">
          <p className="eyebrow mb-3">Partner organisations</p>
          <h2 className="font-serif text-display-md text-brand-navy mb-4">
            Who we work with
          </h2>
          <div className="prose prose-slate prose-a:text-brand-blue max-w-2xl">
            <p>
              We partner with research institutions, civic organisations, and academic bodies on
              specific content areas. These relationships are always disclosed on the relevant
              content. Partner organisations have no editorial authority — they may contribute
              expertise, but final editorial decisions rest with our team.
            </p>
            <p>
              Partner relationships are listed in our annual transparency report alongside funder
              disclosures.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/governance" className="btn-outline">
            Governance
          </Link>
          <Link href="/trust-center" className="btn-outline">
            Trust Center
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact us
          </Link>
        </div>
      </section>
    </>
  )
}
