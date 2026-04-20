import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about the Public Future Initiative.',
}

export default function FAQPage() {
  return (
    <>
      <PageHeader title="Frequently Asked Questions" />
      <section className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <p className="text-body-lg text-slate-600 mb-10">
          Have a question not answered here?{' '}
          <Link href="/contact" className="text-brand-blue hover:underline">
            Get in touch
          </Link>
          .
        </p>
        <div className="space-y-8">
          {[
            {
              q: 'Who runs the Public Future Initiative?',
              a: 'We are an independent, non-partisan civic organisation. Visit our About page for details on our team and governance.',
            },
            {
              q: 'How do you decide what topics to cover?',
              a: 'We prioritise topics where evidence-based information is most lacking in public discourse, and where citizen engagement can meaningfully shift outcomes.',
            },
            {
              q: 'How are evidence ratings assigned?',
              a: 'Our editorial team reviews peer-reviewed research, government data, and systematic reviews. Ratings are strong, moderate, emerging, or contested.',
            },
            {
              q: 'Can I suggest a topic or submit a correction?',
              a: 'Yes. Use our contact page to suggest topics. Corrections can be submitted the same way and are reviewed within five working days.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-slate-200 pb-8 last:border-b-0">
              <h3 className="font-semibold text-heading-sm text-brand-navy mb-3">{q}</h3>
              <p className="text-body-md text-slate-600">{a}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link href="/" className="text-brand-blue hover:underline text-body-sm">
            &larr; Back to home
          </Link>
        </div>
      </section>
    </>
  )
}
