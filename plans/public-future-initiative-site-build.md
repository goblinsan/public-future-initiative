# Public Future Initiative — Site Build Plan

## Project Overview

The **Public Future Initiative** is a civic platform designed to make evidence-based policy accessible to the public. It surfaces explainers, policy options, real-world pilots, and calls to action — all grounded in citations and structured content.

---

## Architecture Decisions

### Framework: Next.js 14 (App Router)
- Server Components by default for fast, SEO-friendly pages
- Static generation (`generateStaticParams`) for content pages
- File-system routing via `app/` directory

### Styling: Tailwind CSS v3 + @tailwindcss/typography
- Utility-first CSS for rapid, consistent styling
- Typography plugin for rendering markdown prose

### Content: Markdown + gray-matter
- Content stored in `content/` as `.md` files with YAML frontmatter
- Parsed at build time via `lib/content.ts`
- Strongly typed via `lib/types/content.ts`

### TypeScript: Strict Mode
- All interfaces defined in `lib/types/content.ts`
- Path alias `@/*` maps to root directory

---

## Folder Structure

```
/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Header, Footer, Inter font)
│   ├── page.tsx                # Homepage hero + section links
│   ├── not-found.tsx           # 404 page
│   ├── explainers/
│   │   ├── page.tsx            # Explainers listing
│   │   └── [slug]/page.tsx     # Individual explainer
│   ├── policy/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── pilots/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── actions/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── glossary/page.tsx
│   ├── about/page.tsx
│   └── privacy/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Site nav (Explainers, Policy, Pilots, Actions, About)
│   │   └── Footer.tsx          # Copyright + Privacy/About links
│   ├── seo/
│   │   └── MetaTags.tsx        # Metadata helper component
│   └── ui/
│       ├── Card.tsx            # Reusable content card
│       └── PageHeader.tsx      # Section hero header
│
├── lib/
│   ├── content.ts              # getContentBySlug / getAllContent
│   ├── metadata.ts             # generatePageMetadata / siteMetadata
│   ├── proposals.ts            # Legacy proposals utility
│   └── types/
│       └── content.ts          # TypeScript interfaces for all content types
│
├── content/                    # Markdown content files
│   ├── explainers/
│   ├── policy/
│   ├── pilots/
│   ├── actions/
│   └── glossary/
│
├── __tests__/                  # Jest tests
│   ├── components/
│   └── lib/
│
└── plans/                      # Planning documents
```

---

## Content Model

### ContentBase (all types extend this)
| Field | Type | Description |
|-------|------|-------------|
| slug | string | URL-safe identifier |
| title | string | Display title |
| description | string | Short summary |
| publishedAt | string | ISO date |
| updatedAt | string? | ISO date |
| tags | string[]? | Categorization tags |
| status | draft \| published \| archived | Publication state |

### Explainer
Extends ContentBase with: `summary`, `citations`, `relatedPolicy`, `relatedPilots`

### PolicyOption
Extends ContentBase with: `problemStatement`, `proposedSolution`, `evidenceStrength`, `citations`, `relatedExplainers`, `relatedPilots`

Evidence strength values: `strong | moderate | emerging | contested`

### Pilot
Extends ContentBase with: `location`, `startDate`, `endDate`, `outcome`, `citations`, `relatedPolicy`

Outcome values: `ongoing | success | partial | failed | cancelled`

### Action
Extends ContentBase with: `actionType`, `startDate`, `endDate`, `location`, `url`, `organizer`

Action types: `campaign | event | petition | volunteer | other`

### GlossaryEntry
Standalone type: `slug`, `term`, `definition`, `relatedTerms`, `citations`

---

## Route Architecture

| Route | Type | Source |
|-------|------|--------|
| `/` | Static | `app/page.tsx` |
| `/explainers` | Static (ISR-ready) | `content/explainers/*.md` |
| `/explainers/[slug]` | SSG | `generateStaticParams` |
| `/policy` | Static | `content/policy/*.md` |
| `/policy/[slug]` | SSG | `generateStaticParams` |
| `/pilots` | Static | `content/pilots/*.md` |
| `/pilots/[slug]` | SSG | `generateStaticParams` |
| `/actions` | Static | `content/actions/*.md` |
| `/actions/[slug]` | SSG | `generateStaticParams` |
| `/glossary` | Static | `content/glossary/*.md` |
| `/about` | Static | `app/about/page.tsx` |
| `/privacy` | Static | `app/privacy/page.tsx` |

---

## CI/CD Strategy

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push to `main` and all PRs:
1. `npm ci` — reproducible install
2. `npm run typecheck` — TypeScript strict mode validation
3. `npm run lint` — ESLint with next/core-web-vitals
4. `npm run build` — production build (validates all pages)
5. `npm run test` — Jest unit and integration tests

---

## Phase Breakdown

### Phase 0 (Complete) — Foundation
- [x] Next.js 14 App Router scaffold
- [x] Tailwind CSS + Typography plugin
- [x] TypeScript strict mode
- [x] ESLint + Prettier
- [x] Jest test infrastructure
- [x] GitHub Actions CI

### Phase 1 — Content Population
- [ ] Write 5+ explainers on key civic topics
- [ ] Document 10+ policy options with evidence ratings
- [ ] Record pilot programs from around the world
- [ ] Add glossary entries for all technical terms

### Phase 2 — Enhanced Content Display
- [ ] MDX rendering for rich content (diagrams, callouts)
- [ ] Citation display components
- [ ] Related content linking
- [ ] Tag-based filtering

### Phase 3 — Community Features
- [ ] Comment system (open source, privacy-respecting)
- [ ] User accounts (optional)
- [ ] Content submission workflow

### Phase 4 — Distribution
- [ ] Email newsletter integration
- [ ] RSS feeds per content type
- [ ] Social sharing optimization

---

## Contributor Guide

### Adding Content
1. Create a `.md` file in the appropriate `content/` subdirectory
2. Add YAML frontmatter matching the TypeScript interface for that content type
3. Set `status: published` when ready to go live
4. Run `npm run build` to verify the page generates correctly

### Adding Components
- Place reusable UI in `components/ui/`
- Layout components go in `components/layout/`
- SEO helpers go in `components/seo/`
- Always export a default function
- Add tests in `__tests__/components/`

### Code Standards
- TypeScript strict mode — no `any` without justification
- Tailwind for all styling — no inline styles
- Server Components by default — use `'use client'` only when needed
- All public APIs must have JSDoc comments
