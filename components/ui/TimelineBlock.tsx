export interface TimelineEvent {
  year: string
  title: string
  description: string
  location?: string
  outcome?: string
}

export interface TimelineBlockProps {
  events: TimelineEvent[]
}

export default function TimelineBlock({ events }: TimelineBlockProps) {
  return (
    <ol className="relative border-l-2 border-brand-blue/20 space-y-10 pl-8">
      {events.map((event, i) => (
        <li key={i} className="relative">
          {/* dot */}
          <span className="absolute -left-[2.15rem] top-1 h-4 w-4 rounded-full border-2 border-brand-blue bg-white" />
          <p className="text-label-sm uppercase text-brand-slate mb-1">{event.year}</p>
          <h4 className="font-semibold text-heading-sm text-brand-navy mb-1">{event.title}</h4>
          {event.location && (
            <p className="text-label-sm text-brand-slate mb-2">{event.location}</p>
          )}
          <p className="text-body-sm text-slate-600">{event.description}</p>
          {event.outcome && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-label-sm text-brand-blue">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue inline-block" />
              {event.outcome}
            </p>
          )}
        </li>
      ))}
    </ol>
  )
}
