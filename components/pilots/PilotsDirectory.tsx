'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import type { Pilot } from '@/lib/types/content'

interface PilotEntry {
  slug: string
  frontmatter: Pilot
}

interface PilotsDirectoryProps {
  pilots: PilotEntry[]
}

const outcomeConfig: Record<
  NonNullable<Pilot['outcome']>,
  { label: string; color: string }
> = {
  ongoing: { label: 'Ongoing', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  success: { label: 'Success', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  partial: { label: 'Partial', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  failed: { label: 'Did not achieve goals', color: 'bg-rose-50 text-rose-800 border-rose-200' },
  cancelled: { label: 'Cancelled', color: 'bg-slate-100 text-slate-600 border-slate-200' },
}

const ALL = 'all'

export default function PilotsDirectory({ pilots }: PilotsDirectoryProps) {
  const [themeFilter, setThemeFilter] = useState(ALL)
  const [regionFilter, setRegionFilter] = useState(ALL)
  const [outcomeFilter, setOutcomeFilter] = useState(ALL)

  const allThemes = useMemo(() => {
    const themes = new Set<string>()
    pilots.forEach(({ frontmatter }) => {
      frontmatter.theme?.forEach((t) => themes.add(t))
    })
    return Array.from(themes).sort()
  }, [pilots])

  const allRegions = useMemo(() => {
    const regions = new Set<string>()
    pilots.forEach(({ frontmatter }) => {
      if (frontmatter.region) regions.add(frontmatter.region)
    })
    return Array.from(regions).sort()
  }, [pilots])

  const featured = pilots.filter((p) => p.frontmatter.featured)
  const filtered = useMemo(() => {
    return pilots.filter(({ frontmatter }) => {
      if (themeFilter !== ALL && !frontmatter.theme?.includes(themeFilter)) return false
      if (regionFilter !== ALL && frontmatter.region !== regionFilter) return false
      if (outcomeFilter !== ALL && frontmatter.outcome !== outcomeFilter) return false
      return true
    })
  }, [pilots, themeFilter, regionFilter, outcomeFilter])

  const isFiltered = themeFilter !== ALL || regionFilter !== ALL || outcomeFilter !== ALL
  const displayed = isFiltered ? filtered : pilots

  return (
    <div>
      {/* Featured pilots */}
      {!isFiltered && featured.length > 0 && (
        <div className="mb-12">
          <p className="eyebrow mb-4">Featured Examples</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {featured.map(({ slug, frontmatter }) => (
              <PilotCard key={slug} slug={slug} frontmatter={frontmatter} featured />
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8 items-center">
        <span className="text-label-sm text-slate-500 mr-1">Filter by:</span>

        <FilterSelect
          label="Theme"
          value={themeFilter}
          onChange={setThemeFilter}
          options={allThemes.map((t) => ({
            value: t,
            label: t
              .split('-')
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' '),
          }))}
        />

        <FilterSelect
          label="Region"
          value={regionFilter}
          onChange={setRegionFilter}
          options={allRegions.map((r) => ({ value: r, label: r }))}
        />

        <FilterSelect
          label="Outcome"
          value={outcomeFilter}
          onChange={setOutcomeFilter}
          options={Object.entries(outcomeConfig).map(([value, { label }]) => ({
            value,
            label,
          }))}
        />

        {isFiltered && (
          <button
            onClick={() => {
              setThemeFilter(ALL)
              setRegionFilter(ALL)
              setOutcomeFilter(ALL)
            }}
            className="text-label-sm text-brand-blue hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      {displayed.length > 0 ? (
        <>
          <p className="text-label-sm text-slate-400 mb-4">
            {displayed.length} {displayed.length === 1 ? 'result' : 'results'}
            {isFiltered && ' matching your filters'}
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {displayed.map(({ slug, frontmatter }) => (
              <PilotCard key={slug} slug={slug} frontmatter={frontmatter} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-slate-500 py-8 text-center">
          No pilots match your filters. Try adjusting or{' '}
          <button
            onClick={() => {
              setThemeFilter(ALL)
              setRegionFilter(ALL)
              setOutcomeFilter(ALL)
            }}
            className="text-brand-blue hover:underline"
          >
            clearing them
          </button>
          .
        </p>
      )}
    </div>
  )
}

function PilotCard({
  slug,
  frontmatter,
  featured = false,
}: {
  slug: string
  frontmatter: Pilot
  featured?: boolean
}) {
  const outcome = frontmatter.outcome ? outcomeConfig[frontmatter.outcome] : null

  return (
    <Link
      href={`/pilots/${slug}`}
      className={`card-base p-6 group hover:border-brand-blue/40 transition-colors block ${featured ? 'border-brand-amber/40 bg-amber-50/30' : ''}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap gap-2">
          {frontmatter.theme?.slice(0, 2).map((t) => (
            <p key={t} className="eyebrow text-brand-amber">
              {t
                .split('-')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ')}
            </p>
          ))}
        </div>
        {outcome && (
          <span
            className={`flex-shrink-0 text-label-sm border px-2 py-0.5 rounded-sm ${outcome.color}`}
          >
            {outcome.label}
          </span>
        )}
      </div>

      <h2 className="font-serif text-heading-md text-brand-navy mb-1 group-hover:text-brand-blue transition-colors">
        {frontmatter.title}
      </h2>

      <p className="text-label-sm text-brand-slate mb-2 flex items-center gap-1">
        <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden /> {frontmatter.location}
        {frontmatter.startDate && (
          <span className="ml-2">
            · {frontmatter.startDate.slice(0, 4)}
            {frontmatter.endDate ? `–${frontmatter.endDate.slice(0, 4)}` : '–present'}
          </span>
        )}
      </p>

      <p className="text-body-sm text-slate-600 leading-relaxed mb-4">
        {frontmatter.description}
      </p>

      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {frontmatter.tags.slice(0, 3).map((tag) => (
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
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      aria-label={`Filter by ${label}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-label-sm border border-slate-200 bg-white text-slate-700 rounded-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
    >
      <option value={ALL}>All {label}s</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
