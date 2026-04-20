import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Our Mission',
  description:
    'Why Public Future Initiative exists and what we are trying to achieve.',
}

export default function MissionPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Our Mission"
        description="Why we exist and what we are trying to build."
      />

      <section className="max-w-3xl mx-auto px-6 md:px-10 py-16 prose prose-slate prose-headings:font-serif prose-headings:text-brand-navy prose-a:text-brand-blue max-w-none">
        <h2>What we are trying to do</h2>
        <p>
          Public policy shapes almost every aspect of daily life — housing costs, job security,
          healthcare access, the quality of air and water, the stability of democratic institutions.
          Yet the public debate about those policies is often shallow, partisan, and deliberately
          confusing.
        </p>
        <p>
          Public Future Initiative exists to change that. We believe that ordinary citizens, given
          accurate information and a clear view of the genuine trade-offs, are entirely capable of
          engaging seriously with hard policy questions. The problem is access to that information —
          not capacity.
        </p>

        <h2>Our founding problem</h2>
        <p>
          Policy analysis has historically been produced for specialists: academics writing for
          other academics, think-tanks writing for ministers, lobbyists writing for their clients.
          The public receives a simplified, filtered version — often filtered by partisan
          intermediaries with an interest in the outcome.
        </p>
        <p>
          At the same time, the internet has created an abundance of opinion and a scarcity of
          structured evidence. It is easy to find a confident assertion about any policy question.
          It is hard to find a careful, sourced, balanced assessment of what the evidence actually
          shows.
        </p>

        <h2>What we are building</h2>
        <p>
          We are building a public resource that gives anyone — regardless of background, education,
          or political starting point — access to the same quality of policy evidence that was
          previously available only to specialists.
        </p>
        <p>That means:</p>
        <ul>
          <li>
            <strong>Explainers that explain.</strong> Clear, honest accounts of what is happening
            and why — without jargon, without partisan slant, and with explicit acknowledgement of
            what is uncertain.
          </li>
          <li>
            <strong>Policy analysis that shows the trade-offs.</strong> Every policy has costs as
            well as benefits. We present both, with evidence ratings so readers can assess the
            quality of the evidence themselves.
          </li>
          <li>
            <strong>Pilot evidence that is honest about results.</strong> Real-world policy
            experiments often produce messy, partial results. We report what actually happened, not
            a cherry-picked version of success.
          </li>
          <li>
            <strong>Action pathways for people who want to do something.</strong> Understanding a
            problem is not enough. We connect analysis to action.
          </li>
        </ul>

        <h2>What we are not</h2>
        <p>
          We are not a campaign. We do not advocate for specific policy outcomes. We do not tell
          readers what to think, vote for, or support. We describe what the evidence shows; what
          people do with that evidence is their choice.
        </p>
        <p>
          We are not a news organisation. We do not cover breaking news or produce daily
          commentary. We produce durable, evidence-based analysis that aims to be as useful in
          three years as it is today.
        </p>
        <p>
          We are not a political party, a think-tank with a disclosed ideological position, or an
          advocacy group. We are accountable to evidence, not to a political programme.
        </p>

        <h2>Who we are accountable to</h2>
        <p>
          We are accountable to the public — specifically, to the readers who use this platform and
          the communities affected by the policy questions we cover. We are not accountable to
          funders, politicians, or any other group with a stake in particular policy outcomes.
        </p>
        <p>
          We make our governance, methodology, and funding transparent so that anyone can assess
          whether we are living up to this standard. If we fall short, we expect to be held
          accountable for it.
        </p>

        <div className="not-prose mt-12 flex flex-wrap gap-4">
          <Link href="/about" className="btn-outline">
            ← About us
          </Link>
          <Link href="/about/team" className="btn-outline">
            Our team
          </Link>
          <Link href="/governance" className="btn-outline">
            Governance
          </Link>
        </div>
      </section>
    </>
  )
}
