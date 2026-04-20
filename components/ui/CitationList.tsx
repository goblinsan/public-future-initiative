import Link from 'next/link'
import type { Citation } from '@/lib/types/content'

const typeLabel: Record<Citation['type'], string> = {
  report: 'Report',
  article: 'Article',
  legislation: 'Legislation',
  dataset: 'Dataset',
  other: 'Source',
}

export interface CitationListProps {
  citations: Citation[]
  heading?: string
}

export default function CitationList({ citations, heading = 'Sources' }: CitationListProps) {
  if (!citations || citations.length === 0) return null

  return (
    <aside
      aria-label="Sources and citations"
      className="mt-12 border-t border-slate-200 pt-8"
    >
      <h2 className="text-heading-sm text-brand-navy mb-4">{heading}</h2>
      <ol className="space-y-4 list-none p-0">
        {citations.map((c, i) => (
          <li key={c.id} id={`cite-${c.id}`} className="flex gap-3">
            <span className="flex-shrink-0 w-5 text-label-sm text-brand-slate mt-0.5">
              {i + 1}.
            </span>
            <div>
              <p className="text-body-sm text-slate-800 font-medium leading-snug">{c.title}</p>
              <p className="text-label-sm text-brand-slate mt-0.5">
                {c.author && <span>{c.author} · </span>}
                <span>{c.source}</span>
                {c.publishedAt && <span> · {new Date(c.publishedAt).getFullYear()}</span>}
                <span className="ml-2 inline-block bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[0.65rem] uppercase tracking-wider">
                  {typeLabel[c.type]}
                </span>
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
    </aside>
  )
}
