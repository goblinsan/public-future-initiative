import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Editorial Standards',
  description:
    'How Public Future Initiative selects, verifies, rates, and publishes content — and how we handle corrections.',
}

export default function EditorialStandardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust Center"
        title="Editorial Standards"
        description="How we select, research, verify, and publish content — and what we do when we get something wrong."
      />

      <section className="max-w-3xl mx-auto px-6 md:px-10 py-16 prose prose-slate prose-headings:font-serif prose-headings:text-brand-navy prose-a:text-brand-blue max-w-none">
        <h2>Our editorial mission</h2>
        <p>
          Public Future Initiative exists to help people understand the policy forces shaping their
          lives and to engage meaningfully with evidence-based debate. Our editorial work serves that
          mission — not traffic, ideology, or partisan interest.
        </p>
        <p>
          Every piece of content we publish must meet three tests: Is it accurate? Is it fair? Is it
          useful to someone trying to understand or act on a real-world policy question?
        </p>

        <h2>Selection criteria</h2>
        <p>We commission and publish content on the basis of the following criteria:</p>
        <ul>
          <li>
            <strong>Public significance.</strong> The topic must have material effects on
            people&apos;s lives, communities, or democratic rights.
          </li>
          <li>
            <strong>Evidence availability.</strong> We cover questions where peer-reviewed research,
            official statistics, or credible empirical evidence exists. We do not write as if
            evidence exists when it does not.
          </li>
          <li>
            <strong>Actionability.</strong> We prioritise topics where readers can do something with
            the information — understand a trade-off, evaluate a policy option, or take civic action.
          </li>
          <li>
            <strong>Non-duplication.</strong> We do not republish analysis that already exists in an
            accessible, high-quality form unless we can add material value.
          </li>
        </ul>

        <h2>Evidence ratings</h2>
        <p>
          Every policy claim in our content is assigned an evidence rating. These ratings are
          editorial judgements, not mechanical outputs. They reflect the weight, quality, and
          consistency of the best available evidence at time of publication.
        </p>
        <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
          {[
            {
              rating: 'Strong',
              color: 'bg-emerald-50 border-emerald-300',
              text: 'Multiple high-quality studies with consistent findings. Academic consensus or IPCC/WHO-equivalent endorsement.',
            },
            {
              rating: 'Moderate',
              color: 'bg-blue-50 border-blue-300',
              text: 'Good evidence base with some gaps or methodological limitations. Balance of evidence supports the claim.',
            },
            {
              rating: 'Emerging',
              color: 'bg-amber-50 border-amber-300',
              text: 'Early-stage or limited evidence. Promising findings that require replication or larger-scale testing.',
            },
            {
              rating: 'Contested',
              color: 'bg-red-50 border-red-300',
              text: 'Credible evidence exists on both sides, or significant methodological disagreement among experts.',
            },
          ].map(({ rating, color, text }) => (
            <div key={rating} className={`border rounded-lg p-4 ${color}`}>
              <p className="font-semibold text-body-sm text-brand-navy mb-1">{rating}</p>
              <p className="text-body-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <h2>Source standards</h2>
        <p>We use sources in the following priority order:</p>
        <ol>
          <li>
            Peer-reviewed academic literature (journals indexed in PubMed, Web of Science, Scopus,
            or equivalent domain-specific repositories)
          </li>
          <li>
            Reports and datasets published by recognised statistical agencies (ONS, Eurostat, World
            Bank, IMF, OECD, etc.)
          </li>
          <li>
            Independent research institutes with transparent methodology and no undisclosed conflicts
            of interest
          </li>
          <li>
            Credible investigative journalism from organisations with published editorial standards
          </li>
          <li>Official government publications and parliamentary records</li>
        </ol>
        <p>
          We do not cite press releases, industry lobbying material, or anonymous sources as primary
          evidence. Where we quote such material, we label it clearly.
        </p>

        <h2>Fact-checking process</h2>
        <p>All factual claims go through a three-step check before publication:</p>
        <ol>
          <li>
            <strong>Author sourcing.</strong> Authors must link every factual claim to a source at
            the time of drafting.
          </li>
          <li>
            <strong>Editorial review.</strong> A second editor checks that sources support the claims
            made, verifies statistics, and flags any overclaiming or underclaiming.
          </li>
          <li>
            <strong>Pre-publication audit.</strong> For major explainers and policy analyses, a
            subject-matter advisor reviews the evidence citations before publication.
          </li>
        </ol>

        <h2>Corrections policy</h2>
        <p>When we publish something incorrect, we correct it visibly and without delay. Our policy:</p>
        <ul>
          <li>
            Corrections are appended to the original page with a <strong>Correction</strong> notice
            showing the date and what changed.
          </li>
          <li>
            Every correction is logged in the public{' '}
            <Link href="/corrections">corrections register</Link>.
          </li>
          <li>
            We do not delete incorrect content without replacing it with a correction notice.
          </li>
          <li>
            Material corrections (those that change the substance of a claim) are flagged at the top
            of the article.
          </li>
        </ul>
        <p>
          To report an error, use our{' '}
          <Link href="/contact">contact form</Link> and select &ldquo;Error or correction&rdquo;.
        </p>

        <h2>Independence and conflicts of interest</h2>
        <p>
          Public Future Initiative does not accept funding that comes with editorial conditions.
          Funders have no right of approval over content. Authors and contributors must disclose any
          relevant financial or professional interests. Where such interests exist, we note them on
          the relevant content.
        </p>
        <p>
          We do not accept sponsored content, native advertising, or paid placement. Editorial
          decisions are made independently of commercial considerations.
        </p>

        <h2>Updates and versioning</h2>
        <p>
          Content is reviewed at least annually. When content is materially updated, we note the
          revision date and provide a brief summary of what changed. Minor updates (fixing typos,
          updating statistics) are noted with an updated date. Major rewrites are flagged with an
          update summary.
        </p>

        <div className="not-prose mt-12 flex flex-wrap gap-4">
          <Link href="/trust-center" className="btn-outline">
            ← Trust Center
          </Link>
          <Link href="/methodology" className="btn-outline">
            Our methodology
          </Link>
          <Link href="/corrections" className="btn-outline">
            Corrections log
          </Link>
        </div>
      </section>
    </>
  )
}
