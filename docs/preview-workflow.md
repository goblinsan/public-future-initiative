# Preview Workflow

This guide describes how to preview content — including draft content — before it is published to the live site.

---

## Table of Contents

1. [Local development preview](#1-local-development-preview)
2. [Previewing draft content](#2-previewing-draft-content)
3. [Pre-merge review checklist](#3-pre-merge-review-checklist)
4. [Pull request preview deployments](#4-pull-request-preview-deployments)
5. [Validating metadata and rendering](#5-validating-metadata-and-rendering)

---

## 1. Local development preview

To preview the site locally, run:

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

Pages are server-rendered and reflect the content files in your working directory. You do not need to restart the dev server when you edit Markdown files — Next.js hot-reload will pick up the change on the next page request.

### What is shown in local dev

By default, `npm run dev` only shows **published** content (`status: published`). Draft content (`status: draft`) is hidden from listings, just as it would be on the live site.

---

## 2. Previewing draft content

### Option A: Temporarily change the status

The simplest approach is to temporarily change `status: draft` to `status: published` in your local copy while reviewing. Revert before committing.

### Option B: Use PREVIEW_MODE

Set the `PREVIEW_MODE` environment variable to `true` to include draft content in all listings:

```bash
PREVIEW_MODE=true npm run dev
```

Or create a `.env.local` file (which is gitignored by Next.js) in the project root:

```
PREVIEW_MODE=true
```

Then run `npm run dev` normally.

In `PREVIEW_MODE`, all content files regardless of `status` appear in listings and are accessible at their normal URLs. Draft banners are not currently rendered automatically — this is a reminder to check the `status` field before merging.

> **Note:** `.env.local` is not committed to the repository. Never set `PREVIEW_MODE=true` in `.env` or in any file that is committed, as this would expose draft content on production.

### Navigating to a draft page directly

If you know the slug of a draft page, you can navigate to it directly in your browser even without `PREVIEW_MODE`:

```
http://localhost:3000/explainers/my-draft-slug
```

The page will render because `getContentBySlug` loads any file regardless of status. Only the listing pages filter by status.

---

## 3. Pre-merge review checklist

Before approving a pull request that adds or modifies content, the reviewer should:

### Content review

- [ ] Open the PR branch locally (`git checkout <branch>` then `npm run dev`)
- [ ] Navigate to the new or changed page and verify it renders correctly
- [ ] Check that the title, description, and summary appear as intended
- [ ] Verify that all citations are visible in the citation list at the bottom of the page
- [ ] Check cross-references (related explainers, pilots, policies) link to real, published pages
- [ ] Confirm `evidenceStrength` is accurate and consistent with the body text
- [ ] Confirm `contentLabel` is appropriate for the tone and purpose of the piece

### Metadata review

- [ ] `npm run validate` passes with no errors (run on the PR branch)
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `publishedAt` is correct
- [ ] `updatedAt` is set if this is a revision to existing content
- [ ] `status` is `published` (or `draft` if intentionally holding back)

### Trust review

- [ ] All factual claims are supported by citations
- [ ] The piece does not overstate the evidence
- [ ] Corrections from previous versions are documented with `CorrectionCallout` if applicable
- [ ] No undisclosed conflicts of interest

---

## 4. Pull request preview deployments

If the repository is connected to a hosting provider that supports preview deployments (e.g. Vercel, Netlify), each pull request will automatically generate a preview URL.

The preview URL is posted as a comment on the PR by the hosting provider's bot. Reviewers can use this URL to check rendering without running the project locally.

> Preview deployments run with `NODE_ENV=production` and **do not** enable `PREVIEW_MODE` automatically. Draft content will not appear in listings on preview deployments. Use local dev with `PREVIEW_MODE=true` to review draft content.

### Setting up Vercel preview deployments

1. Connect the repository to a Vercel project.
2. Vercel will automatically build and deploy every PR branch.
3. No additional configuration is needed for standard content previews.

---

## 5. Validating metadata and rendering

### Validation script

```bash
npm run validate
```

This runs [`scripts/validate-content.js`](../scripts/validate-content.js), which checks all Markdown files in `content/` for required fields, valid date formats, and allowed enum values. It exits with code `1` if any errors are found, making it suitable for CI.

### Typecheck

```bash
npm run typecheck
```

TypeScript strict mode is enabled. This catches type mismatches between content interfaces and the rendering layer.

### Build check

```bash
npm run build
```

Running a production build is the most thorough check. It will fail if any page fails to render due to missing content or type errors. Run this locally before merging changes that affect multiple pages.

### What to check visually

| Element                  | Where to look |
|--------------------------|---------------|
| Page title and eyebrow   | `<h1>` and label above it |
| Summary callout          | Appears below the header |
| Table of contents        | Sidebar on desktop |
| Body content             | Main column |
| Citation list            | Bottom of page |
| Related links            | Sidebar or bottom panel |
| Evidence strength badge  | Visible on policy and pilot pages |
| Content label badge      | Visible on policy pages |

---

## Workflow summary

```
Write content (status: draft)
        ↓
Run: npm run validate
        ↓
Run: PREVIEW_MODE=true npm run dev → review at localhost:3000
        ↓
Open pull request
        ↓
Reviewer checks: validate + typecheck + visual review
        ↓
Change status: published
        ↓
Merge → deploys to production
```
