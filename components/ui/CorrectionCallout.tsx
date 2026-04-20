export interface CorrectionCalloutProps {
  /** ISO date string or human-readable date the correction was made */
  date: string
  /** What was wrong and what has been corrected */
  summary: string
  /** Optional link anchor or URL to the corrections log */
  logHref?: string
}

/**
 * Inline correction notice placed on a page that has been corrected.
 * Links to the full corrections log by default.
 */
export default function CorrectionCallout({ date, summary, logHref = '/corrections' }: CorrectionCalloutProps) {
  return (
    <aside
      aria-label="Correction notice"
      className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-5 py-4 my-6 text-body-sm"
    >
      <svg
        className="shrink-0 mt-0.5 h-5 w-5 text-amber-600"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <div>
        <p className="font-semibold text-amber-800 mb-0.5">Correction — {date}</p>
        <p className="text-amber-700">{summary}</p>
        {logHref && (
          <a
            href={logHref}
            className="mt-1 inline-block text-amber-800 underline hover:text-amber-900"
          >
            View full corrections log →
          </a>
        )}
      </div>
    </aside>
  )
}
