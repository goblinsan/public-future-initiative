import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import { getAllContent } from '@/lib/content'
import type { Explainer } from '@/lib/types/content'

export const metadata: Metadata = {
  title: 'Explainers',
  description: 'Clear, evidence-based breakdowns of complex policy topics.',
}

export default function ExplainersPage() {
  const items = getAllContent<Explainer>('explainers')

  return (
    <>
      <PageHeader
        title="Explainers"
        description="Clear, evidence-based breakdowns of complex policy topics."
      />
      <section className="max-w-5xl mx-auto px-6 py-12">
        {items.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {items.map(({ slug, frontmatter }) => (
              <Card
                key={slug}
                href={`/explainers/${slug}`}
                title={frontmatter.title}
                description={frontmatter.description}
                tags={frontmatter.tags}
                meta={frontmatter.publishedAt}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No explainers published yet.</p>
        )}
        <div className="mt-12">
          <Link href="/" className="text-blue-700 hover:underline text-sm">
            &larr; Back to home
          </Link>
        </div>
      </section>
    </>
  )
}
