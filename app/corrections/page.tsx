import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Corrections',
  description: 'A public record of corrections made to content on the Public Future Initiative.',
}

export default function CorrectionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Transparency"
        title="Corrections"
        description="When we get something wrong, we correct it publicly. This is the full record."
      />
      <section className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <p className="text-body-lg text-slate-600 mb-10">
          No corrections have been logged yet. If you believe you have found an error, please{' '}
          <Link href="/contact" className="text-brand-blue hover:underline">
            contact us
          </Link>
          .
        </p>
        <div className="border border-slate-200 rounded-card p-8 text-center text-slate-400">
          <p className="text-body-sm">Corrections log is empty</p>
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
