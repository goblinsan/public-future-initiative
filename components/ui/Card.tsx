import Link from 'next/link'

export interface CardProps {
  title: string
  description: string
  href: string
  tags?: string[]
  meta?: string
}

export default function Card({ title, description, href, tags, meta }: CardProps) {
  return (
    <article className="card-base p-6 hover:shadow-card-hover transition-shadow">
      <Link href={href} className="group block">
        <h3 className="text-heading-sm text-brand-navy group-hover:text-brand-blue transition-colors mb-2">
          {title}
        </h3>
        <p className="text-body-sm text-slate-600 leading-relaxed">{description}</p>
      </Link>
      {(tags || meta) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {meta && <span className="text-label-sm text-slate-400">{meta}</span>}
          {tags?.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-brand-blue-muted text-brand-blue text-label-sm px-2.5 py-0.5 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

