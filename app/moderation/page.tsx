import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Moderation Policy',
  description:
    'How Public Future Initiative moderates contributions, comments, and community participation.',
}

export default function ModerationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust Center"
        title="Moderation Policy"
        description="How we handle community participation, contributions, and content that does not meet our standards."
      />

      <section className="max-w-3xl mx-auto px-6 md:px-10 py-16 prose prose-slate prose-headings:font-serif prose-headings:text-brand-navy prose-a:text-brand-blue max-w-none">
        <h2>Our approach to moderation</h2>
        <p>
          Public Future Initiative is a civic platform built on evidence and good-faith debate. We
          want participation to be as open as possible, consistent with maintaining a space where
          people of all political backgrounds can engage with evidence seriously.
        </p>
        <p>
          Moderation decisions are guided by a single question: does this contribution help visitors
          understand policy questions better? Content that meets that standard is welcome regardless
          of its political starting point.
        </p>

        <h2>What is not permitted</h2>
        <p>
          We remove contributions that contain any of the following:
        </p>
        <ul>
          <li>
            <strong>Misinformation.</strong> Factual claims that contradict the best available
            evidence without providing credible counter-evidence.
          </li>
          <li>
            <strong>Personal attacks.</strong> Content that attacks individuals rather than
            addressing arguments.
          </li>
          <li>
            <strong>Harassment.</strong> Targeted, repeated, or threatening behaviour directed at
            any person.
          </li>
          <li>
            <strong>Spam and commercial promotion.</strong> Unsolicited commercial content,
            repetitive posting, or attempts to exploit the platform for promotional purposes.
          </li>
          <li>
            <strong>Coordinated inauthentic behaviour.</strong> Attempts to game rankings, flood
            channels, or create the false impression of consensus.
          </li>
          <li>
            <strong>Content that is illegal</strong> in the jurisdiction in which the platform
            operates.
          </li>
        </ul>

        <h2>What we actively protect</h2>
        <p>
          We do not remove content because it challenges prevailing consensus, presents minority
          positions, or is politically inconvenient. We actively protect:
        </p>
        <ul>
          <li>Good-faith disagreement with our own editorial judgements</li>
          <li>Minority political and policy positions, provided they engage with evidence</li>
          <li>Criticism of institutions, governments, corporations, and Public Future Initiative itself</li>
          <li>Personal disclosures of experience relevant to a policy question</li>
        </ul>

        <h2>How moderation decisions are made</h2>
        <p>
          Moderation decisions are made by staff following written guidelines. We do not rely on
          automated content removal. Each removal involves a human judgement. Where a decision is
          close, a second reviewer is consulted.
        </p>
        <p>
          We log all removal decisions internally. Patterns of removal are reviewed monthly to
          identify any systematic bias in our moderation.
        </p>

        <h2>Appeals</h2>
        <p>
          If you believe a moderation decision was wrong, you can appeal by{' '}
          <Link href="/contact">contacting us</Link> and selecting &ldquo;Moderation
          appeal&rdquo;. Appeals are reviewed by a senior team member who was not involved in the
          original decision. We aim to respond within five working days.
        </p>

        <h2>Repeat violations</h2>
        <p>
          A first violation results in removal of the specific content. Repeated violations may
          result in restricted access. We document the reason for any access restriction.
        </p>

        <div className="not-prose mt-12 flex flex-wrap gap-4">
          <Link href="/trust-center" className="btn-outline">
            ← Trust Center
          </Link>
          <Link href="/editorial-standards" className="btn-outline">
            Editorial standards
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact us
          </Link>
        </div>
      </section>
    </>
  )
}
