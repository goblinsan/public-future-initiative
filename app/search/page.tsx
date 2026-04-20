import type { Metadata } from 'next'
import { Suspense } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import SearchClient from '@/components/search/SearchClient'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search across explainers, policy options, pilots, actions, and glossary entries on the Public Future Initiative.',
}

export default function SearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Search"
        title="Find what you're looking for"
        description="Search across explainers, policy options, pilots, actions, and glossary entries."
      />
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <Suspense fallback={<p className="text-slate-500 text-body-sm">Loading…</p>}>
          <SearchClient />
        </Suspense>
      </section>
    </>
  )
}
