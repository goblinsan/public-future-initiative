export interface QuoteBlockProps {
  quote: string
  attribution: string
  role?: string
  organization?: string
}

export default function QuoteBlock({ quote, attribution, role, organization }: QuoteBlockProps) {
  return (
    <figure className="border-l-4 border-brand-amber pl-6 py-1 my-8">
      <blockquote className="font-serif text-body-xl italic text-brand-navy leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-body-sm text-slate-600 not-italic">
        <span className="font-semibold text-slate-800">{attribution}</span>
        {role && <span>, {role}</span>}
        {organization && <span className="text-brand-slate"> · {organization}</span>}
      </figcaption>
    </figure>
  )
}
