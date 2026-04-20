import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import { getAllContent } from '@/lib/content'
import type { Action } from '@/lib/types/content'

export const metadata: Metadata = {
  title: 'Actions',
  description: 'Ways to get involved — campaigns, events, and petitions.',
}

export default function ActionsPage() {
  const items = getAllContent<Action>('actions')

  return (
    <>
      <PageHeader
        title="Actions"
        description="Ways to get involved — campaigns, events, and petitions."
      />
      <section className="max-w-5xl mx-auto px-6 py-12">
        {items.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {items.map(({ slug, frontmatter }) => (
              <Card
                key={slug}
                href={`/actions/${slug}`}
                title={frontmatter.title}
                description={frontmatter.description}
                tags={frontmatter.tags}
                meta={frontmatter.publishedAt}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No actions published yet.</p>
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
