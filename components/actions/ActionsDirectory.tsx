'use client'

import { useState, useMemo, type ReactNode } from 'react'
import Link from 'next/link'
import { Megaphone, Calendar, PenLine, UserPlus, MapPin, Wrench, Zap } from 'lucide-react'
import type { Action } from '@/lib/types/content'

interface ActionEntry {
  slug: string
  frontmatter: Action
}

interface ActionsDirectoryProps {
  actions: ActionEntry[]
}

const actionTypeConfig: Record<
  NonNullable<Action['actionType']>,
  { label: string; icon: ReactNode; color: string }
> = {
  campaign: { label: 'Campaign', icon: <Megaphone className="w-3 h-3" aria-hidden />, color: 'bg-rose-50 text-rose-800 border-rose-200' },
  event: { label: 'Event', icon: <Calendar className="w-3 h-3" aria-hidden />, color: 'bg-blue-50 text-blue-800 border-blue-200' },
  petition: { label: 'Petition', icon: <PenLine className="w-3 h-3" aria-hidden />, color: 'bg-purple-50 text-purple-800 border-purple-200' },
  volunteer: { label: 'Volunteer', icon: <UserPlus className="w-3 h-3" aria-hidden />, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  'local-action': { label: 'Local Action', icon: <MapPin className="w-3 h-3" aria-hidden />, color: 'bg-amber-50 text-amber-800 border-amber-200' },
  toolkit: { label: 'Toolkit', icon: <Wrench className="w-3 h-3" aria-hidden />, color: 'bg-slate-100 text-slate-700 border-slate-200' },
  other: { label: 'Other', icon: <Zap className="w-3 h-3" aria-hidden />, color: 'bg-brand-blue-muted text-brand-blue border-brand-blue/20' },
}

const ALL = 'all'

export default function ActionsDirectory({ actions }: ActionsDirectoryProps) {
  const [typeFilter, setTypeFilter] = useState(ALL)

  const featured = actions.filter((a) => a.frontmatter.featured)

  const filtered = useMemo(() => {
    if (typeFilter === ALL) return actions
    return actions.filter(({ frontmatter }) => frontmatter.actionType === typeFilter)
  }, [actions, typeFilter])

  const isFiltered = typeFilter !== ALL
  const displayed = isFiltered ? filtered : actions

  const availableTypes = useMemo(() => {
    const types = new Set<string>()
    actions.forEach(({ frontmatter }) => {
      if (frontmatter.actionType) types.add(frontmatter.actionType)
    })
    return Array.from(types).sort()
  }, [actions])

  return (
    <div>
      {/* Featured actions */}
      {!isFiltered && featured.length > 0 && (
        <div className="mb-12">
          <p className="eyebrow mb-4">Featured Opportunities</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {featured.map(({ slug, frontmatter }) => (
              <ActionCard key={slug} slug={slug} frontmatter={frontmatter} featured />
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8 items-center">
        <span className="text-label-sm text-slate-500 mr-1">Filter by:</span>

        <button
          onClick={() => setTypeFilter(ALL)}
          className={`text-label-sm px-3 py-1.5 rounded-sm border transition-colors ${
            typeFilter === ALL
              ? 'bg-brand-navy text-white border-brand-navy'
              : 'bg-white text-slate-700 border-slate-200 hover:border-brand-blue/40'
          }`}
        >
          All
        </button>

        {availableTypes.map((type) => {
          const config = actionTypeConfig[type as Action['actionType']]
          if (!config) return null
          return (
              <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`inline-flex items-center gap-1 text-label-sm px-3 py-1.5 rounded-sm border transition-colors ${
                typeFilter === type
                  ? 'bg-brand-navy text-white border-brand-navy'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-brand-blue/40'
              }`}
            >
              {config.icon}
              {config.label}
            </button>
          )
        })}

        {isFiltered && (
          <button
            onClick={() => setTypeFilter(ALL)}
            className="text-label-sm text-brand-blue hover:underline"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Results */}
      {displayed.length > 0 ? (
        <>
          <p className="text-label-sm text-slate-400 mb-4">
            {displayed.length} {displayed.length === 1 ? 'action' : 'actions'}
            {isFiltered && ' matching your filter'}
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {displayed.map(({ slug, frontmatter }) => (
              <ActionCard key={slug} slug={slug} frontmatter={frontmatter} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-slate-500 py-8 text-center">
          No actions match your filter.{' '}
          <button
            onClick={() => setTypeFilter(ALL)}
            className="text-brand-blue hover:underline"
          >
            Clear it
          </button>
          .
        </p>
      )}
    </div>
  )
}

function ActionCard({
  slug,
  frontmatter,
  featured = false,
}: {
  slug: string
  frontmatter: Action
  featured?: boolean
}) {
  const typeConfig = frontmatter.actionType
    ? actionTypeConfig[frontmatter.actionType]
    : null

  return (
    <Link
      href={`/actions/${slug}`}
      className={`card-base p-6 group hover:border-brand-blue/40 transition-colors block ${
        featured ? 'border-brand-amber/40 bg-amber-50/30' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        {typeConfig && (
          <span
            className={`flex-shrink-0 inline-flex items-center gap-1 text-label-sm border px-2 py-0.5 rounded-sm ${typeConfig.color}`}
          >
            {typeConfig.icon} {typeConfig.label}
          </span>
        )}
        {frontmatter.isRemote && (
          <span className="text-label-sm text-brand-slate bg-brand-slate-light border border-brand-slate/20 px-2 py-0.5 rounded-sm">
            Remote / online
          </span>
        )}
      </div>

      <h2 className="font-serif text-heading-md text-brand-navy mb-1 group-hover:text-brand-blue transition-colors">
        {frontmatter.title}
      </h2>

      {frontmatter.location && !frontmatter.isRemote && (
        <p className="text-label-sm text-brand-slate mb-2 flex items-center gap-1">
          <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden /> {frontmatter.location}
          {frontmatter.startDate && (
            <span className="ml-2">
              · {frontmatter.startDate.slice(0, 7)}
            </span>
          )}
        </p>
      )}

      {frontmatter.startDate && frontmatter.isRemote && (
        <p className="text-label-sm text-brand-slate mb-2 flex items-center gap-1">
          <Calendar className="w-3 h-3 flex-shrink-0" aria-hidden /> From {frontmatter.startDate.slice(0, 7)}
        </p>
      )}

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
