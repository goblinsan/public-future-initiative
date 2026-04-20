export interface StatCalloutProps {
  value: string
  label: string
  context?: string
  source?: string
}

export default function StatCallout({ value, label, context, source }: StatCalloutProps) {
  return (
    <div className="border-l-4 border-brand-blue pl-6 py-2">
      <p className="font-serif text-display-md text-brand-navy leading-none mb-1">{value}</p>
      <p className="text-heading-sm text-slate-700 mb-1">{label}</p>
      {context && <p className="text-body-sm text-slate-500 mt-1">{context}</p>}
      {source && (
        <p className="text-label-sm text-brand-slate mt-2 uppercase">{source}</p>
      )}
    </div>
  )
}
