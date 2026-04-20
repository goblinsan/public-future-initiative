import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import { getContentBySlug } from '@/lib/content'
import type { GlossaryEntry } from '@/lib/types/content'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Glossary',
  description: 'Definitions of key terms used across the Public Future Initiative.',
}

function getAllGlossaryEntries(): Array<{ slug: string; entry: GlossaryEntry }> {
  const dir = path.join(process.cwd(), 'content', 'glossary')
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const item = getContentBySlug<GlossaryEntry>('glossary', slug)
      if (!item) return null
      return { slug, entry: item.frontmatter }
    })
    .filter((x): x is { slug: string; entry: GlossaryEntry } => x !== null)
}

export default function GlossaryPage() {
  const items = getAllGlossaryEntries()

  return (
    <>
      <PageHeader
        title="Glossary"
        description="Definitions of key terms used across the Public Future Initiative."
      />
      <section className="max-w-5xl mx-auto px-6 py-12">
        {items.length > 0 ? (
          <dl className="space-y-8">
            {items.map(({ slug, entry }) => (
              <div key={slug} className="bg-white rounded-lg border border-gray-200 p-6">
                <dt className="text-lg font-semibold text-gray-900 mb-2">{entry.term}</dt>
                <dd className="text-gray-600 text-sm leading-relaxed">{entry.definition}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-gray-500">No glossary entries yet.</p>
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
