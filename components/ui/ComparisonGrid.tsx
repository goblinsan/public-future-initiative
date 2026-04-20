import Link from 'next/link'

export interface ComparisonItem {
  title: string
  description: string
  pros?: string[]
  cons?: string[]
  tag?: string
  href?: string
}

export interface ComparisonGridProps {
  title?: string
  items: ComparisonItem[]
}

export default function ComparisonGrid({ title, items }: ComparisonGridProps) {
  return (
    <div>
      {title && (
        <h3 className="font-serif text-heading-lg text-brand-navy mb-6">{title}</h3>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <div key={item.title} className="card-base p-6 flex flex-col">
            {item.tag && (
              <span className="inline-block text-label-sm uppercase text-brand-blue bg-brand-blue-muted px-2.5 py-1 rounded-sm mb-3 self-start">
                {item.tag}
              </span>
            )}
            <h4 className="font-semibold text-heading-sm text-brand-navy mb-2">{item.title}</h4>
            <p className="text-body-sm text-slate-600 mb-4">{item.description}</p>
            {(item.pros || item.cons) && (
              <div className="space-y-3 border-t border-slate-100 pt-4 flex-1">
                {item.pros && item.pros.length > 0 && (
                  <div>
                    <p className="text-label-sm uppercase text-emerald-700 mb-1">Strengths</p>
                    <ul className="space-y-1">
                      {item.pros.map((pro) => (
                        <li key={pro} className="flex gap-2 text-body-sm text-slate-600">
                          <span className="text-emerald-600 mt-0.5 flex-shrink-0">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.cons && item.cons.length > 0 && (
                  <div>
                    <p className="text-label-sm uppercase text-rose-700 mb-1">Trade-offs</p>
                    <ul className="space-y-1">
                      {item.cons.map((con) => (
                        <li key={con} className="flex gap-2 text-body-sm text-slate-600">
                          <span className="text-rose-500 mt-0.5 flex-shrink-0">–</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {item.href && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <Link
                  href={item.href}
                  className="text-label-sm text-brand-blue hover:underline"
                >
                  Read full analysis →
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
