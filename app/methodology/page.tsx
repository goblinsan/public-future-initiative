import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How Public Future Initiative researches, scores, and presents policy evidence — our complete methodology.',
}

export default function MethodologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust Center"
        title="Methodology"
        description="How we research policy questions, score evidence, and structure the information we publish."
      />

      <section className="max-w-3xl mx-auto px-6 md:px-10 py-16 prose prose-slate prose-headings:font-serif prose-headings:text-brand-navy prose-a:text-brand-blue max-w-none">
        <h2>Overview</h2>
        <p>
          Every content type on Public Future Initiative — explainers, policy analyses, pilot
          reports, and debate summaries — follows a documented methodology. This page describes how
          we work. Our goal is to make our reasoning as transparent as the conclusions we reach.
        </p>

        <h2>Explainers</h2>
        <p>
          Explainers answer the question:{' '}
          <em>What is actually happening, and why does it matter?</em> They follow this structure:
        </p>
        <ol>
          <li>
            <strong>Scope definition.</strong> We define the specific phenomenon we are explaining
            and what falls outside it.
          </li>
          <li>
            <strong>Evidence assembly.</strong> We gather the best available empirical evidence
            across the defined scope, prioritising systematic reviews over individual studies where
            available.
          </li>
          <li>
            <strong>Uncertainty mapping.</strong> We explicitly identify what is known with
            confidence, what is contested, and what is unknown.
          </li>
          <li>
            <strong>Plain-language synthesis.</strong> Findings are written for an educated
            non-specialist. Technical terms are defined on first use.
          </li>
        </ol>

        <h2>Policy analyses</h2>
        <p>
          Policy analyses answer:{' '}
          <em>What are the real options, and what do we know about each?</em> For each policy option
          we evaluate:
        </p>
        <ul>
          <li>
            <strong>Mechanism.</strong> How does the policy work in theory? What causal pathway does
            it assume?
          </li>
          <li>
            <strong>Evidence base.</strong> What empirical research exists on this policy or
            comparable interventions? We assign an evidence rating (Strong / Moderate / Emerging /
            Contested).
          </li>
          <li>
            <strong>Trade-offs.</strong> What are the best-evidenced positive effects? What are the
            best-evidenced costs, risks, or distributional effects?
          </li>
          <li>
            <strong>Real-world performance.</strong> Where has this been tried? What happened?
          </li>
          <li>
            <strong>FAQs.</strong> We address the most common objections and misunderstandings
            head-on, citing evidence.
          </li>
        </ul>

        <h2>Pilot reports</h2>
        <p>
          Pilot reports document real-world policy experiments: what was tested, how, and what the
          evidence shows. Our reporting standard requires:
        </p>
        <ul>
          <li>
            <strong>Program fidelity.</strong> Was the pilot implemented as designed? We note any
            significant deviations.
          </li>
          <li>
            <strong>Outcome measurement.</strong> What outcomes were measured? Were they
            pre-registered? We distinguish pre-specified outcomes from post-hoc findings.
          </li>
          <li>
            <strong>Limitations.</strong> We document sample size, selection effects, short
            follow-up periods, and other limitations that affect generalisability.
          </li>
          <li>
            <strong>Transferability.</strong> We assess what conditions would need to hold for
            findings to transfer to different contexts.
          </li>
        </ul>

        <h2>Evidence rating system</h2>
        <p>
          Our four-tier evidence rating is a structured editorial judgement, not an algorithm. It
          weighs:
        </p>
        <ul>
          <li>
            <strong>Study design.</strong> Randomised controlled trials carry more weight than
            observational studies, which carry more weight than case studies. We give particular
            weight to pre-registered studies.
          </li>
          <li>
            <strong>Replication.</strong> Have findings been replicated across multiple independent
            teams? Replicated findings are rated higher.
          </li>
          <li>
            <strong>Effect size and precision.</strong> Large, precisely estimated effects in
            well-powered studies carry more weight than small or imprecisely estimated ones.
          </li>
          <li>
            <strong>Directional consistency.</strong> Do studies point in the same direction even if
            they differ in magnitude?
          </li>
          <li>
            <strong>Expert consensus.</strong> Is there a clear consensus among domain experts, or
            is the field genuinely divided?
          </li>
        </ul>

        <h2>What we do not do</h2>
        <ul>
          <li>
            We do not conduct original empirical research. We synthesise and present existing
            evidence.
          </li>
          <li>
            We do not generate policy recommendations. We present evidence and trade-offs. The
            recommendations are for readers and policymakers.
          </li>
          <li>
            We do not take political positions. We describe what evidence says about outcomes — not
            which outcomes people should prefer.
          </li>
          <li>
            We do not present contested findings as settled. Where evidence is genuinely mixed, we
            say so.
          </li>
        </ul>

        <h2>Review and revision</h2>
        <p>
          All content is reviewed at minimum annually. When major new evidence is published on a
          topic, we update the relevant pages and note what changed. Our editorial calendar includes
          a rolling review cycle for high-traffic and time-sensitive content.
        </p>

        <div className="not-prose mt-12 flex flex-wrap gap-4">
          <Link href="/trust-center" className="btn-outline">
            ← Trust Center
          </Link>
          <Link href="/editorial-standards" className="btn-outline">
            Editorial standards
          </Link>
          <Link href="/governance" className="btn-outline">
            Governance
          </Link>
        </div>
      </section>
    </>
  )
}
