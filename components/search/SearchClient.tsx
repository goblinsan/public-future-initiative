'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import type { SearchResult } from '@/app/api/search/route'

const typeLabels: Record<SearchResult['type'], { label: string; color: string }> = {
  explainer: { label: 'Explainer', color: 'bg-brand-blue-muted text-brand-blue' },
  policy: { label: 'Policy', color: 'bg-amber-50 text-amber-800' },
  pilot: { label: 'Pilot', color: 'bg-emerald-50 text-emerald-800' },
  action: { label: 'Action', color: 'bg-purple-50 text-purple-800' },
  glossary: { label: 'Glossary', color: 'bg-slate-100 text-slate-700' },
}

const TYPE_FILTERS = ['all', 'explainer', 'policy', 'pilot', 'action', 'glossary'] as const
type TypeFilter = (typeof TYPE_FILTERS)[number]

function scoreResult(result: SearchResult, query: string): number {
  const q = query.toLowerCase()
  const title = result.title.toLowerCase()
  const description = result.description.toLowerCase()
  const tags = (result.tags ?? []).join(' ').toLowerCase()

  let score = 0
  if (title === q) score += 100
  else if (title.startsWith(q)) score += 50
  else if (title.includes(q)) score += 30
  if (description.includes(q)) score += 10
  if (tags.includes(q)) score += 5
  return score
}

function filterAndScore(
  results: SearchResult[],
  query: string,
  typeFilter: TypeFilter
): SearchResult[] {
  const q = query.trim().toLowerCase()

  let filtered = results
  if (typeFilter !== 'all') {
    filtered = filtered.filter((r) => r.type === typeFilter)
  }

  if (!q) return filtered

  return filtered
    .map((r) => ({ result: r, score: scoreResult(r, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ result }) => result)
}

export default function SearchClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialQuery = searchParams.get('q') ?? ''
  const initialType = (searchParams.get('type') as TypeFilter) ?? 'all'

  const [query, setQuery] = useState(initialQuery)
  const [typeFilter, setTypeFilter] = useState<TypeFilter>(
    TYPE_FILTERS.includes(initialType) ? initialType : 'all'
  )
  const [allResults, setAllResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/search')
      .then((r) => r.json())
      .then((data: SearchResult[]) => {
        setAllResults(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const displayed = filterAndScore(allResults, query, typeFilter)

  function handleQueryChange(value: string) {
    setQuery(value)
    const params = new URLSearchParams()
    if (value) params.set('q', value)
    if (typeFilter !== 'all') params.set('type', typeFilter)
    const qs = params.toString()
    router.replace(qs ? `/search?${qs}` : '/search', { scroll: false })
  }

  function handleTypeChange(type: TypeFilter) {
    setTypeFilter(type)
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (type !== 'all') params.set('type', type)
    const qs = params.toString()
    router.replace(qs ? `/search?${qs}` : '/search', { scroll: false })
  }

  const hasQuery = query.trim().length > 0
  const hasResults = displayed.length > 0

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-6">
        <label htmlFor="search-input" className="sr-only">
          Search the site
        </label>
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          aria-hidden="true"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </span>
        <input
          id="search-input"
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search explainers, policy, pilots, actions…"
          className="w-full pl-12 pr-4 py-3.5 text-body-md rounded-lg border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue placeholder:text-slate-400"
          aria-label="Search"
          aria-describedby="search-status"
        />
      </div>

      {/* Type filter */}
      <div role="group" aria-label="Filter by content type" className="flex flex-wrap gap-2 mb-8">
        {TYPE_FILTERS.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => handleTypeChange(type)}
            className={`px-3 py-1.5 rounded-full text-label-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
              typeFilter === type
                ? 'bg-brand-navy text-white border-brand-navy'
                : 'bg-white text-slate-600 border-slate-200 hover:border-brand-blue hover:text-brand-blue'
            }`}
            aria-pressed={typeFilter === type}
          >
            {type === 'all' ? 'All' : typeLabels[type as SearchResult['type']].label}
          </button>
        ))}
      </div>

      {/* Status / results */}
      {loading ? (
        <p className="text-slate-500 text-body-sm" aria-live="polite">
          Loading search index…
        </p>
      ) : (
        <>
          <p
            id="search-status"
            className="text-body-sm text-slate-500 mb-6"
            aria-live="polite"
            aria-atomic="true"
          >
            {hasQuery
              ? hasResults
                ? `${displayed.length} result${displayed.length !== 1 ? 's' : ''} for "${query}"`
                : `No results for "${query}"`
              : `${allResults.length} items indexed across all content types.`}
          </p>

          {hasResults ? (
            <ul className="space-y-4" role="list" aria-label="Search results">
              {displayed.map((result) => {
                const badge = typeLabels[result.type]
                return (
                  <li key={`${result.type}-${result.slug}`}>
                    <Link
                      href={result.href}
                      className="group block bg-white rounded-card border border-slate-200 p-5 hover:border-brand-blue/40 hover:shadow-card transition-all"
                    >
                      <div className="flex items-start gap-3 mb-1">
                        <span
                          className={`flex-shrink-0 text-label-sm px-2 py-0.5 rounded-sm ${badge.color}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <h2 className="font-semibold text-brand-navy text-heading-sm group-hover:text-brand-blue transition-colors mb-1">
                        {result.title}
                      </h2>
                      {result.description && (
                        <p className="text-body-sm text-slate-600 line-clamp-2">
                          {result.description}
                        </p>
                      )}
                      {result.tags && result.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {result.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-label-sm bg-brand-blue-muted text-brand-blue px-2 py-0.5 rounded-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : hasQuery ? (
            <div className="text-center py-12 bg-white rounded-card border border-slate-200">
              <p className="text-slate-500 text-body-md mb-4">
                No results found for &ldquo;{query}&rdquo;.
              </p>
              <p className="text-body-sm text-slate-400">
                Try a shorter or different search term, or browse by section below.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/explainers" className="btn-outline text-body-sm px-4 py-2">
                  Browse Explainers
                </Link>
                <Link href="/policy" className="btn-outline text-body-sm px-4 py-2">
                  Browse Policy
                </Link>
                <Link href="/pilots" className="btn-outline text-body-sm px-4 py-2">
                  Browse Pilots
                </Link>
                <Link href="/actions" className="btn-outline text-body-sm px-4 py-2">
                  Browse Actions
                </Link>
                <Link href="/glossary" className="btn-outline text-body-sm px-4 py-2">
                  Browse Glossary
                </Link>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
