import Link from 'next/link'
import type { Citation } from '@/lib/types/content'

export type EvidenceStrength = 'strong' | 'moderate' | 'emerging' | 'contested'

export interface EvidenceSummaryProps {
  strength: EvidenceStrength
  keyFindings?: string[]
  openQuestions?: string[]
  citations?: Citation[]
}

const strengthConfig: Record<EvidenceStrength, { label: string; color: string; bg: string }> = {
  strong: {
    label: 'Strong evidence',
    color: 'text-emerald-800 border-emerald-200',
    bg: 'bg-emerald-50',
  },
  moderate: {
    label: 'Moderate evidence',
    color: 'text-blue-800 border-blue-200',
    bg: 'bg-blue-50',
  },
  emerging: {
    label: 'Emerging evidence',
    color: 'text-amber-800 border-amber-200',
    bg: 'bg-amber-50',
  },
  contested: {
    label: 'Contested',
    color: 'text-rose-800 border-rose-200',
    bg: 'bg-rose-50',
  },
}

export default function EvidenceSummary({
  strength,
  keyFindings,
  openQuestions,
  citations,
}: EvidenceSummaryProps) {
  const { label, color, bg } = strengthConfig[strength]

  return (
    <section aria-label="Evidence summary" className="mt-12 border-t border-slate-200 pt-8">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-heading-sm text-brand-navy">Evidence Summary</h2>
        <span className={`text-label-sm border px-2.5 py-1 rounded-sm ${bg} ${color}`}>
          {label}
        </span>
      </div>

      {keyFindings && keyFindings.length > 0 && (
        <div className="mb-6">
          <h3 className="eyebrow mb-3">Key Findings</h3>
          <ul className="space-y-2">
            {keyFindings.map((finding, i) => (
              <li key={i} className="flex gap-2 text-body-sm text-slate-700">
                <span className="flex-shrink-0 text-emerald-600 mt-0.5">✓</span>
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {openQuestions && openQuestions.length > 0 && (
        <div className="mb-6">
          <h3 className="eyebrow mb-3">Open Questions</h3>
          <ul className="space-y-2">
            {openQuestions.map((question, i) => (
              <li key={i} className="flex gap-2 text-body-sm text-slate-700">
                <span className="flex-shrink-0 text-brand-amber mt-0.5">?</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {citations && citations.length > 0 && (
        <div>
          <h3 className="eyebrow mb-3">Sources</h3>
          <ol className="space-y-3 list-none p-0">
            {citations.map((c, i) => (
              <li key={c.id} className="flex gap-3">
                <span className="flex-shrink-0 w-5 text-label-sm text-brand-slate mt-0.5">
                  {i + 1}.
                </span>
                <div>
                  <p className="text-body-sm text-slate-800 font-medium leading-snug">{c.title}</p>
                  <p className="text-label-sm text-brand-slate mt-0.5">
                    {c.author && <span>{c.author} · </span>}
                    <span>{c.source}</span>
                    {c.publishedAt && (
                      <span> · {new Date(c.publishedAt).getFullYear()}</span>
                    )}
                  </p>
                  {c.url && (
                    <Link
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-label-sm text-brand-blue hover:underline mt-0.5 inline-block"
                    >
                      View source →
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}
