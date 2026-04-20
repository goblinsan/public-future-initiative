import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import ContactForms from '@/components/contact/ContactForms'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Public Future Initiative.',
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Questions, corrections, media requests, or partnership proposals — we want to hear from you."
      />
      <section className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <p className="text-body-lg text-slate-600 mb-10">
          We read every message. Select the type of enquiry below and we will route it to the right
          person.
        </p>

        <div className="bg-white rounded-card border border-slate-200 shadow-card p-8 mb-10">
          <ContactForms />
        </div>

        {/* Corrections note */}
        <div className="bg-brand-cream rounded-card border border-slate-200 p-5 mb-10">
          <p className="text-body-sm text-slate-600">
            <span className="font-semibold text-brand-navy">Found an error?</span> Please{' '}
            <Link href="/corrections" className="text-brand-blue hover:underline">
              read our corrections policy
            </Link>{' '}
            before getting in touch — it describes the fastest way to get factual errors corrected.
          </p>
        </div>

        {/* Privacy note */}
        <p className="text-body-sm text-slate-400 mb-10">
          We use the information you provide only to respond to your message. We do not share it
          with third parties or use it for marketing.{' '}
          <Link href="/privacy" className="text-brand-blue hover:underline">
            Privacy policy →
          </Link>
        </p>

        <Link href="/" className="text-brand-blue hover:underline text-body-sm">
          &larr; Back to home
        </Link>
      </section>
    </>
  )
}
