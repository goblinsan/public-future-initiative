import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Governance',
  description:
    'How Public Future Initiative is governed, who is responsible for editorial decisions, and how accountability works.',
}

export default function GovernancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust Center"
        title="Governance"
        description="Who is responsible for editorial decisions, how oversight works, and how we remain accountable to the public."
      />

      <section className="max-w-3xl mx-auto px-6 md:px-10 py-16 prose prose-slate prose-headings:font-serif prose-headings:text-brand-navy prose-a:text-brand-blue max-w-none">
        <h2>Organisational structure</h2>
        <p>
          Public Future Initiative is an independent civic media organisation. We operate under a
          board of directors who are responsible for strategic oversight, financial integrity, and
          editorial independence. The board does not make day-to-day editorial decisions — those
          rest with the editorial team.
        </p>

        <h2>Editorial independence</h2>
        <p>
          Editorial decisions — what to publish, how to present evidence, what ratings to assign —
          are made exclusively by the editorial team. No board member, funder, partner, or
          advertiser has the right to approve, block, or alter editorial content.
        </p>
        <p>
          This separation is structural, not aspirational. It is written into our founding
          documents and cannot be overridden by any individual regardless of their role or
          financial contribution.
        </p>

        <h2>Board responsibilities</h2>
        <p>The board is responsible for:</p>
        <ul>
          <li>Appointing and removing the executive director</li>
          <li>Approving annual budgets and audited accounts</li>
          <li>Ensuring compliance with charity law and organisational regulations</li>
          <li>Reviewing and approving major governance changes</li>
          <li>Safeguarding the organisation&apos;s non-partisan mandate</li>
        </ul>
        <p>
          The board does <strong>not</strong> approve editorial content, commission articles, or
          direct the editorial team&apos;s coverage decisions.
        </p>

        <h2>Editorial team responsibilities</h2>
        <p>The editorial team is responsible for:</p>
        <ul>
          <li>All content published on the platform</li>
          <li>Applying and enforcing editorial standards</li>
          <li>Assigning and reviewing evidence ratings</li>
          <li>Managing the corrections process</li>
          <li>Commissioning and editing contributions from external researchers and analysts</li>
        </ul>

        <h2>Advisory board</h2>
        <p>
          Our advisory board consists of independent researchers, policy analysts, and civic
          practitioners. Their role is to advise on methodology, review content for accuracy in
          specialist areas, and provide expertise on specific policy domains. Advisory board
          members do not vote on governance matters and have no editorial authority.
        </p>
        <p>
          All advisory board members are named publicly. Any financial relationship between an
          advisory board member and the organisation is disclosed. See our{' '}
          <Link href="/about/advisors">advisors page</Link>.
        </p>

        <h2>Funder relationships</h2>
        <p>
          We accept funding from charitable foundations, individual donors, and public grant
          bodies. All funders are disclosed in our annual transparency report. No funder receives
          editorial influence as a condition of or consequence of their support.
        </p>
        <p>
          We do not accept funding from political parties, government departments, or corporations
          with a direct financial interest in the specific policy areas we cover.
        </p>

        <h2>Accountability mechanisms</h2>
        <p>
          We maintain the following accountability mechanisms:
        </p>
        <ul>
          <li>
            <strong>Public corrections register.</strong> Every correction to published content is
            logged publicly at <Link href="/corrections">/corrections</Link>.
          </li>
          <li>
            <strong>Annual transparency report.</strong> We publish an annual report covering our
            funding sources, editorial statistics, corrections record, and governance activity.
          </li>
          <li>
            <strong>Contact for concerns.</strong> Anyone can raise concerns about our editorial
            conduct or governance via our <Link href="/contact">contact page</Link>.
          </li>
          <li>
            <strong>Third-party audit.</strong> Our accounts are audited annually by an independent
            auditor. Audited accounts are published on our partners page.
          </li>
        </ul>

        <h2>Complaints process</h2>
        <p>
          If you believe we have breached our editorial standards or acted in a way that
          compromises our stated mission, you can submit a formal complaint by{' '}
          <Link href="/contact">contacting us</Link> and selecting &ldquo;Formal complaint&rdquo;.
        </p>
        <p>
          Complaints are reviewed by a senior team member. We aim to acknowledge receipt within
          two working days and provide a substantive response within fifteen working days. If you
          are unsatisfied with our response, we will explain what external bodies you can escalate
          to.
        </p>

        <div className="not-prose mt-12 flex flex-wrap gap-4">
          <Link href="/trust-center" className="btn-outline">
            ← Trust Center
          </Link>
          <Link href="/about" className="btn-outline">
            About us
          </Link>
          <Link href="/about/advisors" className="btn-outline">
            Advisory board
          </Link>
          <Link href="/partners" className="btn-outline">
            Funders &amp; partners
          </Link>
        </div>
      </section>
    </>
  )
}
