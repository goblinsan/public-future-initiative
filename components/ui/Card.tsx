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
    <article className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <Link href={href} className="group block">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </Link>
      {(tags || meta) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {meta && <span className="text-xs text-gray-400">{meta}</span>}
          {tags?.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
