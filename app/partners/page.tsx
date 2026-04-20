import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Organisations and funders who support the Public Future Initiative.',
}

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Transparency"
        title="Partners &amp; Funders"
        description="We are transparent about who supports our work. No funder influences editorial decisions."
      />
      <section className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <p className="text-body-lg text-slate-600 mb-10">
          Details of our current funders and partner organisations will be published here. If you
          are interested in supporting the Public Future Initiative,{' '}
          <Link href="/contact" className="text-brand-blue hover:underline">
            get in touch
          </Link>
          .
        </p>
        <div className="mt-12">
          <Link href="/" className="text-brand-blue hover:underline text-body-sm">
            &larr; Back to home
          </Link>
        </div>
      </section>
    </>
  )
}
