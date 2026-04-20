import Link from 'next/link'
import SectionIntro from '@/components/ui/SectionIntro'
import StatCallout from '@/components/ui/StatCallout'
import CTAPanel from '@/components/ui/CTAPanel'

const featuredDebates = [
  {
    href: '/policy',
    topic: 'Housing',
    question: 'Can zoning reform actually solve the housing crisis — or does it miss the root cause?',
    polarities: ['Build more market-rate housing', 'Prioritise social housing'],
  },
  {
    href: '/policy',
    topic: 'Climate',
    question: 'Is carbon pricing the most effective lever for reaching net zero by 2050?',
    polarities: ['Yes — price signals change behavior', 'No — regulation and investment work better'],
  },
  {
    href: '/policy',
    topic: 'Healthcare',
    question: 'Does a single-payer system deliver better outcomes at lower cost?',
    polarities: ['Evidence says yes', 'Depends entirely on implementation'],
  },
]

const pathways = [
  {
    href: '/explainers',
    icon: '📖',
    title: "What's Changing",
    description:
      'Clear, evidence-based explainers on the forces reshaping our shared future — from housing to AI to climate.',
  },
  {
    href: '/policy',
    icon: '⚖️',
    title: 'Policy Paths',
    description:
      'Every major policy option, mapped with evidence ratings, trade-offs, and links to real-world results.',
  },
  {
    href: '/pilots',
    icon: '🔬',
    title: 'Pilots',
    description:
      'What happens when ideas are tested. Real programs, honest outcomes, transferable lessons.',
  },
  {
    href: '/actions',
    icon: '✊',
    title: 'Take Action',
    description:
      'Campaigns, petitions, events, and volunteering opportunities — matched to issues you care about.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero / Mission ── */}
      <section className="bg-brand-navy text-white py-28 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow text-white/50 mb-5">Public Future Initiative</p>
          <h1 className="font-serif text-display-lg md:text-display-xl max-w-3xl mb-6 leading-tight">
            Policy is too important to leave to politicians alone.
          </h1>
          <p className="text-body-xl text-white/75 max-w-2xl mb-10 leading-relaxed">
            We translate complex policy into plain language, track what actually works, and connect
            citizens to the levers of change. Non-partisan, evidence-based, built in public.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/explainers" className="btn-primary bg-white text-brand-navy hover:bg-brand-cream">
              Start Learning
            </Link>
            <Link
              href="/about"
              className="btn-secondary text-white border-white/50 hover:bg-white/10"
            >
              Our Approach
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Why This Matters ── */}
      <section className="py-20 px-6 md:px-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionIntro
            eyebrow="Why it matters"
            title="The decisions being made now will shape the next 50 years."
            description="Most people never engage with policy — not from apathy, but from complexity. We exist to close that gap."
          />
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            <StatCallout
              value="78%"
              label="of adults feel unable to influence government policy"
              context="Even when they have strong views on outcomes"
              source="Pew Research, 2024"
            />
            <StatCallout
              value="43"
              label="major policy decisions are made every year affecting household finances"
              context="Most receive less than 48 hours of public attention"
              source="Policy Institute estimate"
            />
            <StatCallout
              value="6×"
              label="more likely to act when given clear, structured information"
              context="Citizens with access to evidence engage more"
              source="OECD, 2023"
            />
          </div>
        </div>
      </section>

      {/* ── 3. What a Better Future Looks Like ── */}
      <section className="py-20 px-6 md:px-10 bg-brand-cream">
        <div className="max-w-5xl mx-auto">
          <SectionIntro
            eyebrow="A different kind of platform"
            title="Evidence over ideology. Complexity held honestly. Action made possible."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Plain-language explainers',
                body: 'Every topic unpacked without jargon. Written for curious people, not policy specialists.',
              },
              {
                title: 'Transparent trade-offs',
                body: 'We show the evidence for and against every option — including what is genuinely uncertain.',
              },
              {
                title: 'Real-world pilots',
                body: "What happened when cities and countries tried these ideas. Honest results, not cherry-picked wins.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-white rounded-card border border-slate-200 shadow-card p-7">
                <h3 className="font-serif text-heading-md text-brand-navy mb-3">{title}</h3>
                <p className="text-body-sm text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. How to Navigate ── */}
      <section className="py-20 px-6 md:px-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionIntro
            eyebrow="Where to start"
            title="Four ways to engage — pick what fits you."
          />
          <div className="grid sm:grid-cols-2 gap-5 mt-2">
            {pathways.map(({ href, icon, title, description }) => (
              <Link
                key={href}
                href={href}
                className="group flex gap-5 items-start bg-white rounded-card border border-slate-200 shadow-card p-6 hover:shadow-card-hover hover:border-brand-blue/30 transition-all"
              >
                <span className="text-2xl leading-none mt-0.5 flex-shrink-0" aria-hidden>
                  {icon}
                </span>
                <div>
                  <h3 className="font-semibold text-heading-sm text-brand-navy group-hover:text-brand-blue transition-colors mb-1.5">
                    {title}
                  </h3>
                  <p className="text-body-sm text-slate-600">{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Featured Debates ── */}
      <section className="py-20 px-6 md:px-10 bg-brand-slate-light">
        <div className="max-w-5xl mx-auto">
          <SectionIntro
            eyebrow="Active debates"
            title="The questions with no easy answers."
            description="These are the contested questions where the evidence is genuinely mixed. We map the best arguments on each side."
          />
          <div className="space-y-4">
            {featuredDebates.map(({ href, topic, question, polarities }) => (
              <Link
                key={question}
                href={href}
                className="group block bg-white rounded-card border border-slate-200 shadow-card p-6 hover:shadow-card-hover hover:border-brand-blue/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-block flex-shrink-0 text-label-sm uppercase text-brand-blue bg-brand-blue-muted px-2.5 py-1 rounded-sm mt-0.5">
                    {topic}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-heading-md text-brand-navy mb-3 group-hover:text-brand-blue transition-colors">
                      {question}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {polarities.map((p) => (
                        <span
                          key={p}
                          className="text-label-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-sm"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/debate" className="btn-outline inline-flex">
              See all debates →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Trust Signals ── */}
      <section className="py-20 px-6 md:px-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionIntro
            eyebrow="How we work"
            title="Trust is built through transparency, not authority."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: 'Sources cited',
                body: 'Every claim links to its source. No orphaned assertions.',
              },
              {
                label: 'No political affiliation',
                body: 'We are non-partisan and funded independently of government or parties.',
              },
              {
                label: 'Evidence ratings',
                body: 'We distinguish between strong, moderate, emerging, and contested evidence.',
              },
              {
                label: 'Corrections policy',
                body: 'Mistakes are corrected publicly with a full record of what changed.',
              },
            ].map(({ label, body }) => (
              <div key={label} className="border-l-2 border-brand-blue/30 pl-5 py-1">
                <p className="font-semibold text-body-sm text-brand-navy mb-1.5">{label}</p>
                <p className="text-body-sm text-slate-500">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-body-sm text-slate-500">
            <Link href="/trust-center" className="text-brand-blue hover:underline font-medium">
              Read about our methodology and editorial standards →
            </Link>
          </p>
        </div>
      </section>

      {/* ── 7. Participation CTA ── */}
      <section className="py-16 px-6 md:px-10 bg-brand-cream">
        <div className="max-w-5xl mx-auto">
          <CTAPanel
            variant="navy"
            title="The future is still being written."
            description="Stay informed as policy develops, follow pilots in your region, and take action when it counts. Join thousands of engaged citizens."
            primaryCTA={{ label: 'Get started', href: '/explainers' }}
            secondaryCTA={{ label: 'Take action today', href: '/actions' }}
          />
        </div>
      </section>
    </>
  )
}

