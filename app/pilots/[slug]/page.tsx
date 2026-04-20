import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContentBySlug, getAllContent } from '@/lib/content'
import type { Pilot } from '@/lib/types/content'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const items = getAllContent<Pilot>('pilots')
  return items.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getContentBySlug<Pilot>('pilots', params.slug)
  if (!item) return {}
  return {
    title: item.frontmatter.title,
    description: item.frontmatter.description,
  }
}

export default function PilotPage({ params }: Props) {
  const item = getContentBySlug<Pilot>('pilots', params.slug)
  if (!item) notFound()

  const { frontmatter, content } = item

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/pilots" className="text-blue-700 hover:underline text-sm">
        &larr; All Pilots
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-4">{frontmatter.title}</h1>
      <p className="text-gray-500 text-sm mb-8">{frontmatter.publishedAt}</p>
      <div className="prose prose-gray max-w-none">{content}</div>
    </article>
  )
}
