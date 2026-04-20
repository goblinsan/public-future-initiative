import Link from 'next/link'

export type EvidenceStrength = 'strong' | 'moderate' | 'emerging' | 'contested'

export interface EvidenceCardProps {
  title: string
  summary: string
  source: string
  url?: string
  strength: EvidenceStrength
  year?: string
}

const strengthConfig: Record<EvidenceStrength, { label: string; color: string }> = {
  strong: { label: 'Strong evidence', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  moderate: { label: 'Moderate evidence', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  emerging: { label: 'Emerging evidence', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  contested: { label: 'Contested', color: 'bg-rose-50 text-rose-800 border-rose-200' },
}

export default function EvidenceCard({
  title,
  summary,
  source,
  url,
  strength,
  year,
}: EvidenceCardProps) {
  const { label, color } = strengthConfig[strength]

  return (
    <div className="card-base p-6">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h4 className="font-semibold text-heading-sm text-brand-navy flex-1">{title}</h4>
        <span
          className={`flex-shrink-0 text-label-sm border px-2.5 py-1 rounded-sm ${color}`}
        >
          {label}
        </span>
      </div>
      <p className="text-body-sm text-slate-600 mb-4">{summary}</p>
      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="text-label-sm text-brand-slate">
          {source}
          {year && <span className="ml-1 text-slate-400">· {year}</span>}
        </p>
        {url && (
          <Link
            href={url}
            className="text-label-sm text-brand-blue hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source →
          </Link>
        )}
      </div>
    </div>
  )
}
