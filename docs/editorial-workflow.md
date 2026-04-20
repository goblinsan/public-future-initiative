# Editorial Workflow

This guide covers everything a contributor or editor needs to know to add, update, review, and publish content on the Public Future Initiative site. No CMS access is required — all content is managed through Markdown files in the `content/` directory.

---

## Table of Contents

1. [Content model overview](#1-content-model-overview)
2. [Adding new content](#2-adding-new-content)
3. [Updating existing content](#3-updating-existing-content)
4. [Citing sources](#4-citing-sources)
5. [Applying content labels](#5-applying-content-labels)
6. [Handling corrections and updates](#6-handling-corrections-and-updates)
7. [Trust and transparency expectations](#7-trust-and-transparency-expectations)
8. [Validation and quality checks](#8-validation-and-quality-checks)
9. [Publishing checklist](#9-publishing-checklist)

---

## 1. Content model overview

Content is stored as Markdown files with YAML frontmatter. Each content type lives in its own directory:

| Directory              | Content type     | TypeScript interface |
|------------------------|------------------|----------------------|
| `content/explainers/`  | Explainers       | `Explainer`          |
| `content/policy/`      | Policy options   | `PolicyOption`       |
| `content/pilots/`      | Pilot programmes | `Pilot`              |
| `content/actions/`     | Actions          | `Action`             |
| `content/glossary/`    | Glossary entries | `GlossaryEntry`      |
| `content/timeline/`    | Timeline events  | `TimelineEvent`      |

All types are defined in [`lib/types/content.ts`](../lib/types/content.ts).

Starter templates for every content type live in [`content/templates/`](../content/templates/). Copy the appropriate template when creating new content.

### Slug convention

The page URL is derived from the filename. Use lowercase, hyphen-separated slugs:

```
content/explainers/universal-basic-income.md  →  /explainers/universal-basic-income
content/policy/shorter-work-week.md           →  /policy/shorter-work-week
```

Slugs must be stable once published. Changing a slug breaks inbound links.

---

## 2. Adding new content

### Step-by-step

1. **Copy the correct template** from `content/templates/`:

   ```bash
   cp content/templates/explainer.md content/explainers/my-new-topic.md
   ```

2. **Fill in the frontmatter** — all required fields must be present. The templates mark which fields are required and which are optional.

3. **Write the Markdown body** following the section structure in the template.

4. **Set `status: draft`** while the piece is being written and reviewed.

5. **Run validation** to catch missing or malformed fields:

   ```bash
   npm run validate
   ```

6. **Open a pull request** when the content is ready for review. See the [preview workflow](./preview-workflow.md) for how to review rendering before merge.

7. **Change `status: published`** once the PR is approved and merged.

### Required fields by content type

#### Explainer (`content/explainers/`)

| Field         | Required | Notes |
|---------------|----------|-------|
| `title`       | ✅       | Full display title |
| `description` | ✅       | Used in `<meta>` and listing cards |
| `summary`     | ✅       | Single sentence; displayed in callout blocks |
| `publishedAt` | ✅       | `YYYY-MM-DD` format |
| `status`      | ✅       | `draft` \| `published` \| `archived` |
| `type`        | ✅       | Must be `explainer` |
| `updatedAt`   | –        | Add whenever the piece is substantively revised |
| `citations`   | –        | Required when making factual claims; see §4 |

#### Policy option (`content/policy/`)

| Field              | Required | Notes |
|--------------------|----------|-------|
| `title`            | ✅       | |
| `description`      | ✅       | |
| `summary`          | ✅       | |
| `publishedAt`      | ✅       | |
| `status`           | ✅       | Adds `adopted` and `rejected` to base options |
| `type`             | ✅       | Must be `policy` |
| `problemStatement` | ✅       | Concrete description of the problem |
| `proposedSolution` | ✅       | The policy mechanism |
| `evidenceStrength` | ✅       | `strong` \| `moderate` \| `emerging` \| `contested` |
| `contentLabel`     | –        | `explainer` \| `analysis` \| `policy-brief` \| `debate-summary` |
| `tradeoffs`        | –        | Strongly encouraged; shows `pros` and `cons` |

#### Pilot programme (`content/pilots/`)

| Field        | Required | Notes |
|--------------|----------|-------|
| `title`      | ✅       | |
| `description`| ✅       | |
| `location`   | ✅       | City and country |
| `publishedAt`| ✅       | |
| `status`     | ✅       | |
| `type`       | ✅       | Must be `pilot` |
| `outcome`    | –        | `ongoing` \| `success` \| `partial` \| `failed` \| `cancelled` |
| `evidenceStrength` | – | `strong` \| `moderate` \| `emerging` \| `contested` |

#### Action (`content/actions/`)

| Field        | Required | Notes |
|--------------|----------|-------|
| `title`      | ✅       | |
| `description`| ✅       | |
| `publishedAt`| ✅       | |
| `status`     | ✅       | |
| `type`       | ✅       | Must be `action` |
| `actionType` | ✅       | `campaign` \| `event` \| `petition` \| `volunteer` \| `local-action` \| `toolkit` \| `other` |

---

## 3. Updating existing content

When revising an existing page:

1. Edit the Markdown file directly in your branch.
2. **Add or update `updatedAt`** in the frontmatter using today's date in `YYYY-MM-DD` format.
3. If the revision corrects a factual error, add a correction note to the page body using the `CorrectionCallout` component:

   ```md
   <CorrectionCallout date="YYYY-MM-DD">
   The original figure cited was incorrect. The correct value is X, sourced from [Source].
   </CorrectionCallout>
   ```

4. If the revision is a substantive update (new section, revised conclusion), add an `UpdateNote`:

   ```md
   <UpdateNote date="YYYY-MM-DD">
   This explainer has been updated to reflect the 2024 evaluation report.
   </UpdateNote>
   ```

5. Run `npm run validate` before opening a PR.

---

## 4. Citing sources

Every factual claim must be backed by a citation. Citations are defined in the frontmatter and referenced in the Markdown body.

### Citation structure

```yaml
citations:
  - id: standing-2017           # unique within this file
    title: "Basic Income: And How We Can Make It Happen"
    author: "Guy Standing"
    publishedAt: "2017-01-01"
    source: "Pelican Books"
    url: "https://example.com"  # required when publicly available
    type: report                # report | article | legislation | dataset | other
```

### Required citation fields

| Field    | Required | Notes |
|----------|----------|-------|
| `id`     | ✅       | Unique key within the file; use `author-year` convention |
| `title`  | ✅       | Full title of the publication |
| `source` | ✅       | Publisher, journal, or institution |
| `type`   | ✅       | One of the allowed values above |
| `author` | –        | Include where known |
| `publishedAt` | – | Date of the original publication |
| `url`    | –        | Required for online-accessible sources |

### Guidelines

- Prefer primary sources (research reports, official data, legislation) over secondary commentary.
- Where a claim is disputed, cite sources that represent multiple positions.
- Do not cite sources behind paywalls without also providing a publicly accessible summary or preprint.
- Use the `type: legislation` value for acts, bills, and statutory instruments.

---

## 5. Applying content labels

Policy pages can carry an optional `contentLabel` field to signal the type of analysis:

| Label            | When to use |
|------------------|-------------|
| `explainer`      | Primarily educational; presents the issue without advocacy |
| `analysis`       | Evaluates a policy option using available evidence |
| `policy-brief`   | Structured policy recommendation for a decision-maker audience |
| `debate-summary` | Presents multiple positions fairly; does not advocate a conclusion |

The `contentLabel` appears on the rendered page to help readers understand the editorial stance.

### Evidence strength

The `evidenceStrength` field on policy and pilot pages signals the maturity of the evidence base:

| Value      | Meaning |
|------------|---------|
| `strong`   | Multiple RCTs or large-scale evaluations with consistent findings |
| `moderate` | Credible studies with some limitations or mixed results |
| `emerging` | Early-stage evidence; pilots underway but not yet evaluated |
| `contested`| Evidence exists but expert interpretation differs substantially |

Be honest. Overstating evidence strength undermines reader trust.

---

## 6. Handling corrections and updates

### Minor corrections (typos, broken links, small factual fixes)

- Fix directly and open a PR with a brief description of the change.
- No need for a public correction note unless the error could have misled readers.

### Factual corrections

If published content contained an incorrect claim:

1. Fix the error in the Markdown body.
2. Update `updatedAt` in the frontmatter.
3. Add a `CorrectionCallout` near the corrected text noting what changed and why.
4. Describe the correction in the PR description.

### Significant updates

If a pilot has new results, a policy has been adopted, or evidence has materially changed:

1. Update the content.
2. Update `updatedAt`.
3. Add an `UpdateNote` at the top of the body explaining what changed.
4. Update `evidenceStrength` or `outcome` fields if appropriate.
5. Add any new citations to the frontmatter.

### Retractions

If content must be removed entirely:

1. Change `status` to `archived`.
2. The page will be removed from listings but the URL may still be accessible.
3. Discuss with a maintainer before archiving published content.

---

## 7. Trust and transparency expectations

The Public Future Initiative is committed to transparent, evidence-based publishing. Every editor should uphold these standards:

### What we expect from contributors

- **Attribute claims**: Every factual assertion needs a citation or must be presented as opinion.
- **Disclose affiliations**: If you have a financial or organisational interest in a topic you are writing about, disclose it in the PR description. A maintainer will decide whether a disclosure is needed on the page itself.
- **Do not overstate certainty**: Use hedging language where evidence is limited. Prefer "evidence suggests" over "evidence proves".
- **Separate fact from advocacy**: Explainers present information. Policy briefs may advocate, but must acknowledge counterarguments.

### Content labels and editorial signals

Use `contentLabel` on policy pages to make the editorial stance explicit to readers. Unlabelled content defaults to neutral/informational.

Use `evidenceStrength` honestly — downgrade it if you are uncertain, rather than overstating.

### Corrections policy

We correct errors promptly and transparently. Corrections are not hidden — they are documented in-page using `CorrectionCallout`. We do not silently edit published content without recording what changed.

---

## 8. Validation and quality checks

### Automated validation

Run the validation script before opening a PR:

```bash
npm run validate
```

This checks all content files for required fields, valid date formats, and allowed enum values. The CI pipeline runs this automatically on every pull request.

### TypeScript typecheck

```bash
npm run typecheck
```

Ensures all content type interfaces are satisfied.

### Local preview

Before merging, preview the rendered page locally:

```bash
npm run dev
```

See [preview-workflow.md](./preview-workflow.md) for the full preview process.

---

## 9. Publishing checklist

Before approving and merging a PR with new or updated content:

- [ ] All required frontmatter fields are present
- [ ] `publishedAt` is in `YYYY-MM-DD` format
- [ ] `status: published` (or `draft` if intentionally holding back)
- [ ] All factual claims have citations with `id`, `title`, `source`, and `type`
- [ ] `evidenceStrength` is accurate and not overstated
- [ ] `contentLabel` is set on all policy pages
- [ ] `updatedAt` is set if this is a revision
- [ ] Corrections are documented with `CorrectionCallout` if applicable
- [ ] `npm run validate` passes with no errors
- [ ] Page renders correctly in local dev preview
- [ ] Cross-references (`relatedPolicy`, `relatedPilots`, etc.) point to real slugs
- [ ] PR description summarises what changed and why
