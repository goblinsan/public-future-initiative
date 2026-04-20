export interface UpdateNoteProps {
  /** ISO date string or human-readable date of the last update */
  lastUpdated: string
  /** Optional description of what changed in this update */
  updateSummary?: string
}

/**
 * Displays a "Last updated" notice for articles and policy pages.
 * Use at the top or bottom of content that is periodically revised.
 */
export default function UpdateNote({ lastUpdated, updateSummary }: UpdateNoteProps) {
  return (
    <aside
      aria-label="Update notice"
      className="flex items-start gap-3 border-l-4 border-brand-slate/40 pl-4 py-1 my-6 text-body-sm text-slate-500"
    >
      <svg
        className="shrink-0 mt-0.5 h-4 w-4 text-brand-slate"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
      <div>
        <span className="font-medium text-slate-600">Last updated {lastUpdated}.</span>
        {updateSummary && <span className="ml-1">{updateSummary}</span>}
      </div>
    </aside>
  )
}
