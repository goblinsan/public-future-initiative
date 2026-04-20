import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContentBySlug, getAllContent } from '@/lib/content'
import type { GlossaryEntry } from '@/lib/types/content'
import { renderMarkdown } from '@/lib/markdown'
import CitationList from '@/components/ui/CitationList'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const items = getAllContent<GlossaryEntry>('glossary')
  return items.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getContentBySlug<GlossaryEntry>('glossary', slug)
  if (!item) return {}
  return {
    title: item.frontmatter.term,
    description: item.frontmatter.definition,
  }
}

export default async function GlossaryEntryPage({ params }: Props) {
  const { slug } = await params
  const item = getContentBySlug<GlossaryEntry>('glossary', slug)
  if (!item) notFound()

  const { frontmatter, content } = item
  const htmlContent = content ? renderMarkdown(content) : null
  const citations = frontmatter.citations ?? []

  return (
    <div className="bg-brand-cream">
      <div className="bg-brand-navy text-white py-14 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/glossary"
            className="text-white/60 hover:text-white text-label-sm uppercase tracking-wider mb-6 inline-block"
          >
            ← Glossary
          </Link>
          <p className="eyebrow text-brand-amber mb-3">Definition</p>
          <h1 className="font-serif text-display-md md:text-display-lg mb-4">
            {frontmatter.term}
          </h1>
          <p className="text-white/80 text-body-lg max-w-2xl leading-relaxed">
            {frontmatter.definition}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12 items-start">
          {/* Main content */}
          <article>
            {htmlContent && (
              <div
                className="prose prose-civic max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            )}

            {citations.length > 0 && <CitationList citations={citations} />}

            <div className="mt-10 pt-8 border-t border-slate-200">
              <Link href="/glossary" className="text-brand-blue hover:underline text-label-sm">
                ← Back to Glossary
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block sticky top-8 space-y-8">
            {/* Related terms */}
            {frontmatter.relatedTerms && frontmatter.relatedTerms.length > 0 && (
              <div>
                <p className="eyebrow mb-3">Related Terms</p>
                <ul className="space-y-2 list-none p-0">
                  {frontmatter.relatedTerms.map((termSlug) => (
                    <li key={termSlug}>
                      <Link
                        href={`/glossary/${termSlug}`}
                        className="text-body-sm text-brand-blue hover:underline"
                      >
                        {termSlug.replace(/-/g, ' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cross-links */}
            <div>
              <p className="eyebrow mb-3">Explore Further</p>
              <ul className="space-y-2 list-none p-0">
                <li>
                  <Link href="/explainers" className="text-body-sm text-brand-blue hover:underline">
                    Read explainers →
                  </Link>
                </li>
                <li>
                  <Link href="/policy" className="text-body-sm text-brand-blue hover:underline">
                    See policy options →
                  </Link>
                </li>
                <li>
                  <Link href="/timeline" className="text-body-sm text-brand-blue hover:underline">
                    View timeline →
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
