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
        <div className="prose prose-slate prose-headings:font-serif prose-headings:text-brand-navy prose-a:text-brand-blue max-w-none mb-10">
          <h2>Our corrections policy</h2>
          <p>
            We correct errors as quickly as possible after they are identified. Our policy:
          </p>
          <ul>
            <li>
              <strong>No stealth edits.</strong> We do not silently fix errors. Every correction is
              documented here with the date and a description of what changed.
            </li>
            <li>
              <strong>On-page notices.</strong> Material corrections (those that change the
              substance of a claim) are flagged at the top of the corrected page with a visible
              correction notice.
            </li>
            <li>
              <strong>Minor corrections</strong> (fixing typos, formatting, broken links) are noted
              with an updated date but do not require a full correction entry.
            </li>
            <li>
              <strong>Source-level errors</strong> — where our source itself contained an error —
              are noted as such.
            </li>
          </ul>
          <p>
            To report an error, use our{' '}
            <Link href="/contact">contact form</Link> and select &ldquo;Error or correction&rdquo;.
            We aim to review all submissions within two working days.
          </p>

          <h2>Corrections log</h2>
        </div>

        <div className="border border-slate-200 rounded-card p-8 text-center text-slate-400 mb-10">
          <p className="text-body-sm">No corrections have been logged yet.</p>
          <p className="text-body-sm mt-1">
            If you believe you have found an error,{' '}
            <Link href="/contact" className="text-brand-blue hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/trust-center" className="btn-outline">
            ← Trust Center
          </Link>
          <Link href="/editorial-standards" className="btn-outline">
            Editorial standards
          </Link>
        </div>
      </section>
    </>
  )
}
