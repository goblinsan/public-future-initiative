export type DisclosureVariant = 'funding' | 'conflict' | 'affiliation' | 'general'

export interface DisclosureCalloutProps {
  variant?: DisclosureVariant
  /** Main disclosure text */
  text: string
  /** Optional link for more detail */
  moreHref?: string
  moreLabel?: string
}

const variantConfig: Record<
  DisclosureVariant,
  { label: string; colorClass: string; iconPath: string }
> = {
  funding: {
    label: 'Funding disclosure',
    colorClass: 'bg-blue-50 border-blue-200 text-blue-800',
    iconPath:
      'M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zm14 5H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM8 13a1 1 0 100-2 1 1 0 000 2zm0-4a1 1 0 100-2 1 1 0 000 2zm4 4a1 1 0 100-2 1 1 0 000 2zm0-4a1 1 0 100-2 1 1 0 000 2z',
  },
  conflict: {
    label: 'Conflict of interest disclosure',
    colorClass: 'bg-orange-50 border-orange-200 text-orange-800',
    iconPath:
      'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z',
  },
  affiliation: {
    label: 'Affiliation disclosure',
    colorClass: 'bg-purple-50 border-purple-200 text-purple-800',
    iconPath:
      'M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z',
  },
  general: {
    label: 'Disclosure',
    colorClass: 'bg-slate-50 border-slate-200 text-slate-700',
    iconPath:
      'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z',
  },
}

/**
 * Inline disclosure callout for funding, conflict of interest, or affiliation notices.
 * Place near the top of relevant content sections.
 */
export default function DisclosureCallout({
  variant = 'general',
  text,
  moreHref,
  moreLabel = 'Learn more',
}: DisclosureCalloutProps) {
  const config = variantConfig[variant]

  return (
    <aside
      aria-label={config.label}
      className={`flex items-start gap-3 border rounded-lg px-5 py-4 my-6 text-body-sm ${config.colorClass}`}
    >
      <svg
        className="shrink-0 mt-0.5 h-5 w-5 opacity-70"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={config.iconPath} />
      </svg>
      <div>
        <p className="font-semibold mb-0.5">{config.label}</p>
        <p className="opacity-90">{text}</p>
        {moreHref && (
          <a href={moreHref} className="mt-1 inline-block underline hover:opacity-80">
            {moreLabel} →
          </a>
        )}
      </div>
    </aside>
  )
}
