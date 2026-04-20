import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Public Future Initiative is a non-partisan civic platform providing evidence-based policy analysis and civic action resources.',
}

const values = [
  {
    title: 'Non-partisan',
    description:
      'We have no political affiliation. We do not advocate for parties, candidates, or ideological programmes. We follow evidence.',
  },
  {
    title: 'Evidence-based',
    description:
      'Every claim is rated and sourced. We distinguish strong evidence from emerging evidence from contested claims. We never flatten uncertainty.',
  },
  {
    title: 'Transparent',
    description:
      'Our methodology, governance, and funding are publicly documented. We correct mistakes publicly. No stealth edits.',
  },
  {
    title: 'Independent',
    description:
      'We accept no funding that comes with editorial conditions. No funder, partner, or sponsor has the right to influence what we publish.',
  },
  {
    title: 'Accessible',
    description:
      'Policy analysis should not require a PhD to understand. We write for curious, intelligent adults — not specialists.',
  },
  {
    title: 'Accountable',
    description:
      'We hold ourselves to the same standards of evidence we apply to everyone else. If we get something wrong, we say so publicly.',
  },
]

const pages = [
  { href: '/about/mission', label: 'Our Mission', description: 'Why we exist and what we are trying to achieve.' },
  { href: '/about/team', label: 'Team', description: 'The people who research, write, edit, and build this platform.' },
  { href: '/about/advisors', label: 'Advisory Board', description: 'Independent specialists who advise on methodology and content accuracy.' },
  { href: '/governance', label: 'Governance', description: 'How we are structured, who makes decisions, and how we stay accountable.' },
  { href: '/partners', label: 'Funders & Partners', description: 'Who funds our work and how we protect editorial independence.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About Public Future Initiative"
        description="We are a non-partisan civic platform providing evidence-based policy analysis, real-world pilot evidence, and pathways to civic action — for everyone."
      />

      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        {/* What we are */}
        <div className="max-w-2xl mb-16">
          <p className="eyebrow mb-3">What we are</p>
          <h2 className="font-serif text-display-md text-brand-navy mb-4">
            An independent civic platform, not a personality brand.
          </h2>
          <p className="text-body-lg text-slate-600 leading-relaxed mb-4">
            Public Future Initiative exists because good policy analysis has historically been locked
            behind institutions, paywalls, or partisan intermediaries. We are building an open,
            transparent resource that gives any citizen access to the same quality of policy evidence
            that was previously available only to specialists.
          </p>
          <p className="text-body-lg text-slate-600 leading-relaxed">
            We do not tell people what to think. We describe what the evidence shows, map the
            genuine trade-offs, and let readers draw their own conclusions. We are accountable to
            evidence — not to funders, politicians, or any other group with a stake in particular
            policy outcomes.
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <p className="eyebrow mb-3">Our values</p>
          <h2 className="font-serif text-display-md text-brand-navy mb-8">
            What we stand for
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ title, description }) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-card shadow-card p-6"
              >
                <h3 className="font-semibold text-heading-sm text-brand-navy mb-2">{title}</h3>
                <p className="text-body-sm text-slate-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-pages */}
        <div className="mb-16">
          <p className="eyebrow mb-3">Learn more</p>
          <h2 className="font-serif text-display-md text-brand-navy mb-8">
            About our organisation
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map(({ href, label, description }) => (
              <Link
                key={href}
                href={href}
                className="group block bg-brand-cream border border-slate-200 rounded-card p-5 hover:border-brand-blue/50 hover:shadow-card transition-all"
              >
                <h3 className="font-semibold text-body-sm text-brand-navy mb-1.5 group-hover:text-brand-blue transition-colors">
                  {label} →
                </h3>
                <p className="text-body-sm text-slate-500 leading-relaxed">{description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Trust center CTA */}
        <div className="border-t border-slate-200 pt-12 flex flex-wrap gap-4">
          <Link href="/trust-center" className="btn-primary">
            Trust Center
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact us
          </Link>
        </div>
      </section>
    </>
  )
}
