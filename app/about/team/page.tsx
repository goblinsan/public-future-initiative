import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Team',
  description: 'The people behind Public Future Initiative.',
}

const team = [
  {
    name: 'Editorial Team',
    description:
      'Our editorial team commissions, researches, writes, and fact-checks all content on the platform. Team members are drawn from backgrounds in policy analysis, investigative journalism, public health research, and social science.',
    note: 'Individual team members are listed in our annual transparency report to protect against targeted harassment.',
  },
  {
    name: 'Research & Methodology',
    description:
      'Our research team develops and maintains our evidence rating methodology, commissions external expert reviews, and ensures our content standards are consistently applied across all topic areas.',
    note: null,
  },
  {
    name: 'Technology',
    description:
      'Our technology team builds and maintains the platform. The site is open-source and we publish our technical architecture for review.',
    note: null,
  },
  {
    name: 'Operations',
    description:
      'Our operations team manages funding relationships, legal compliance, governance processes, and organisational administration. Operations staff have no editorial responsibilities.',
    note: null,
  },
]

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Our Team"
        description="The people who research, write, edit, and build Public Future Initiative."
      />

      <section className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <div className="prose prose-slate prose-headings:font-serif prose-headings:text-brand-navy prose-a:text-brand-blue max-w-none mb-12">
          <p>
            Public Future Initiative operates with a small, specialist team. We deliberately stay
            lean to minimise institutional overhead and maximise the proportion of our resources
            that go into producing and maintaining content.
          </p>
          <p>
            We work with a network of independent researchers, policy analysts, and domain experts
            who contribute to specific content areas. All contributors are disclosed when their work
            appears on the platform.
          </p>
        </div>

        <div className="space-y-6 mb-16">
          {team.map(({ name, description, note }) => (
            <div key={name} className="bg-white border border-slate-200 rounded-card shadow-card p-6">
              <h3 className="font-semibold text-heading-sm text-brand-navy mb-2">{name}</h3>
              <p className="text-body-sm text-slate-600 leading-relaxed mb-2">{description}</p>
              {note && (
                <p className="text-body-sm text-slate-400 italic">{note}</p>
              )}
            </div>
          ))}
        </div>

        <div className="prose prose-slate prose-headings:font-serif prose-headings:text-brand-navy prose-a:text-brand-blue max-w-none mb-12">
          <h2>Working with us</h2>
          <p>
            We occasionally commission research, analysis, and writing from independent specialists.
            If you are a researcher, analyst, or domain expert and would like to contribute, please{' '}
            <Link href="/contact">get in touch</Link>.
          </p>
          <p>
            We are transparent about all paid contributions. Contributors must disclose any
            relevant financial or professional interests. We do not commission work from people who
            have undisclosed material interests in the outcome of the analysis.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/about" className="btn-outline">
            ← About us
          </Link>
          <Link href="/about/advisors" className="btn-outline">
            Advisory board
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact us
          </Link>
        </div>
      </section>
    </>
  )
}
