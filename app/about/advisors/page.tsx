import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Advisory Board',
  description:
    'The independent researchers, policy analysts, and practitioners who advise Public Future Initiative on methodology and content.',
}

const advisoryAreas = [
  {
    area: 'Economic Policy',
    description:
      'Advisors in this area review evidence ratings and methodology for content on labour markets, fiscal policy, taxation, welfare systems, and macroeconomic analysis.',
  },
  {
    area: 'Housing & Urban Policy',
    description:
      'Advisors review our housing explainers, planning policy analyses, and pilot reports for technical accuracy and appropriate representation of contested empirical questions.',
  },
  {
    area: 'Health & Social Care',
    description:
      'Advisors in health provide methodological review of clinical evidence, public health research, and health economics content.',
  },
  {
    area: 'Climate & Environment',
    description:
      'Advisors review our climate science summaries, energy policy analyses, and environmental pilot reports against current scientific literature.',
  },
  {
    area: 'Democratic Systems',
    description:
      'Advisors cover electoral systems, constitutional law, democratic participation research, and civic engagement evidence.',
  },
  {
    area: 'Research Methodology',
    description:
      'Cross-cutting advisors review our evidence rating system and help ensure our methodology standards are applied consistently.',
  },
]

export default function AdvisorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Advisory Board"
        description="Independent specialists who review our methodology and advise on content accuracy across specific policy domains."
      />

      <section className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <div className="prose prose-slate prose-headings:font-serif prose-headings:text-brand-navy prose-a:text-brand-blue max-w-none mb-12">
          <h2>Role of the advisory board</h2>
          <p>
            Our advisory board provides independent expert review of our methodology, evidence
            ratings, and content in specific policy domains. Advisory board members are not
            editorial staff — they do not commission or write content, and they do not have a vote
            on governance matters.
          </p>
          <p>
            Their role is to challenge us when our methodology falls short, flag emerging evidence
            we may have missed, and provide specialist review of content in areas requiring deep
            domain expertise.
          </p>

          <h2>Appointment and independence</h2>
          <p>
            Advisory board members are appointed by the editorial director on the basis of
            expertise and independence. We require that advisors have no undisclosed financial
            interest in the policy areas they review for us.
          </p>
          <p>
            All advisors are disclosed publicly. Any financial relationship between an advisor and
            the organisation — including any honoraria for review work — is disclosed in our annual
            transparency report.
          </p>

          <h2>Advisors by area</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {advisoryAreas.map(({ area, description }) => (
            <div key={area} className="bg-brand-cream border border-slate-200 rounded-card p-5">
              <h3 className="font-semibold text-body-sm text-brand-navy mb-1.5">{area}</h3>
              <p className="text-body-sm text-slate-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-slate prose-headings:font-serif prose-headings:text-brand-navy prose-a:text-brand-blue max-w-none mb-8">
          <p>
            Named advisors are listed in our annual transparency report. If you are a researcher or
            practitioner who would like to be considered for the advisory board,{' '}
            <Link href="/contact">contact us</Link>.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/about" className="btn-outline">
            ← About us
          </Link>
          <Link href="/governance" className="btn-outline">
            Governance
          </Link>
          <Link href="/methodology" className="btn-outline">
            Methodology
          </Link>
        </div>
      </section>
    </>
  )
}
