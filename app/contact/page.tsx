import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Public Future Initiative.',
}

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" description="Questions, corrections, or ideas — we want to hear from you." />
      <section className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <p className="text-body-lg text-slate-600 mb-10">
          We read every message. Please allow up to five working days for a response.
        </p>
        <div className="space-y-6 mb-12">
          <div className="bg-white rounded-card border border-slate-200 shadow-card p-6">
            <h3 className="font-semibold text-heading-sm text-brand-navy mb-1">General enquiries</h3>
            <p className="text-body-sm text-slate-600">
              For questions about our content, methodology, or organisation.
            </p>
          </div>
          <div className="bg-white rounded-card border border-slate-200 shadow-card p-6">
            <h3 className="font-semibold text-heading-sm text-brand-navy mb-1">Corrections</h3>
            <p className="text-body-sm text-slate-600">
              Found an error? Please{' '}
              <Link href="/corrections" className="text-brand-blue hover:underline">
                read our corrections policy
              </Link>{' '}
              and submit details.
            </p>
          </div>
          <div className="bg-white rounded-card border border-slate-200 shadow-card p-6">
            <h3 className="font-semibold text-heading-sm text-brand-navy mb-1">Partnerships</h3>
            <p className="text-body-sm text-slate-600">
              Interested in working with us?{' '}
              <Link href="/partners" className="text-brand-blue hover:underline">
                See our partners page
              </Link>{' '}
              for current collaborations.
            </p>
          </div>
        </div>
        <Link href="/" className="text-brand-blue hover:underline text-body-sm">
          &larr; Back to home
        </Link>
      </section>
    </>
  )
}
