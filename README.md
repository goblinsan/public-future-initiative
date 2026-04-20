# Public Future Initiative

A civic platform for policy, pilots, and public action — built with Next.js 14, TypeScript, and Tailwind CSS.

## About

The Public Future Initiative makes evidence-based policy accessible to everyone. It surfaces:

- **Explainers** — clear breakdowns of complex policy topics
- **Policy Options** — concrete proposals with evidence ratings and citations
- **Pilots** — documented real-world experiments and their outcomes
- **Actions** — ways to get involved (campaigns, events, petitions)

## Folder Structure

```
/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   ├── explainers/       # Explainer listing + [slug] detail
│   ├── policy/           # Policy listing + [slug] detail
│   ├── pilots/           # Pilots listing + [slug] detail
│   ├── actions/          # Actions listing + [slug] detail
│   ├── glossary/         # Glossary page
│   ├── about/            # About page
│   └── privacy/          # Privacy policy
├── components/
│   ├── layout/           # Header, Footer
│   ├── seo/              # MetaTags helper
│   └── ui/               # Card, PageHeader
├── lib/
│   ├── content.ts        # Markdown content loader
│   ├── metadata.ts       # SEO metadata helpers
│   └── types/content.ts  # TypeScript interfaces
├── content/              # Markdown content files
│   ├── explainers/
│   ├── policy/
│   ├── pilots/
│   ├── actions/
│   └── glossary/
├── __tests__/            # Jest tests
└── plans/                # Architecture & planning docs
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run test` | Run Jest test suite |

## Adding Content

Content lives in `content/` as Markdown files with YAML frontmatter. Each content type has a TypeScript interface in `lib/types/content.ts`.

To add an explainer:

```bash
# Create content/explainers/my-topic.md with frontmatter:
---
title: My Topic
description: Short summary
publishedAt: "2024-01-01"
status: published
type: explainer
summary: One-sentence summary
---

Your markdown content here.
```

Set `status: published` to make it live.

## Contributor Guide

See [`plans/public-future-initiative-site-build.md`](./plans/public-future-initiative-site-build.md) for the full architecture guide, content model documentation, and phase roadmap.

### Code Standards
- TypeScript strict mode — no `any` without justification
- Tailwind for all styling
- Server Components by default — use `'use client'` only when needed
- Tests required for new components and lib utilities

## CI

GitHub Actions runs on every push to `main` and all pull requests:
`typecheck → lint → build → test`
