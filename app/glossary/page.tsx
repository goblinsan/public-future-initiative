import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import { getAllContent } from '@/lib/content'
import type { GlossaryEntry } from '@/lib/types/content'

export const metadata: Metadata = {
  title: 'Glossary',
  description: 'Definitions of key terms used across the Public Future Initiative.',
}

export default function GlossaryPage() {
  const items = getAllContent<GlossaryEntry>('glossary')

  // Group by first letter
  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    const letter = item.frontmatter.term[0].toUpperCase()
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(item)
    return acc
  }, {})
  const letters = Object.keys(grouped).sort()

  return (
    <>
      <PageHeader
        eyebrow="Reference"
        title="Glossary"
        description="Definitions of key terms used across explainers, policy pages, and pilot summaries."
      />
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        {/* A–Z quick nav */}
        {letters.length > 0 && (
          <nav aria-label="Glossary alphabet" className="flex flex-wrap gap-2 mb-10">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="inline-flex items-center justify-center w-8 h-8 rounded border border-slate-200 text-label-sm text-brand-navy hover:bg-brand-blue-muted hover:border-brand-blue transition-colors"
              >
                {letter}
              </a>
            ))}
          </nav>
        )}

        {items.length > 0 ? (
          <div className="space-y-12">
            {letters.map((letter) => (
              <div key={letter} id={`letter-${letter}`}>
                <h2 className="font-serif text-display-md text-brand-navy border-b border-slate-200 pb-2 mb-6">
                  {letter}
                </h2>
                <dl className="space-y-6">
                  {grouped[letter].map(({ slug, frontmatter }) => (
                    <div key={slug} className="bg-white rounded-card border border-slate-200 p-6">
                      <dt className="text-heading-sm text-brand-navy mb-2">
                        <Link
                          href={`/glossary/${slug}`}
                          className="hover:text-brand-blue transition-colors"
                        >
                          {frontmatter.term}
                        </Link>
                      </dt>
                      <dd className="text-body-sm text-slate-600 leading-relaxed">
                        {frontmatter.definition}
                      </dd>
                      <div className="mt-3">
                        <Link
                          href={`/glossary/${slug}`}
                          className="text-label-sm text-brand-blue hover:underline"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500">No glossary entries published yet.</p>
        )}

        <div className="mt-12">
          <Link href="/" className="text-brand-blue hover:underline text-label-sm">
            &larr; Back to home
          </Link>
        </div>
      </section>
    </>
  )
}
