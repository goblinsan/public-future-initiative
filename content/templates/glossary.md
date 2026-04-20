---
# REQUIRED FIELDS ────────────────────────────────────────────────────────────
# Note: the slug is derived from the filename (e.g. universal-basic-income.md → 'universal-basic-income')
term: "Term or Acronym"
definition: "A clear, concise definition of the term. Should be understandable without prior knowledge. One to three sentences."

# OPTIONAL FIELDS ─────────────────────────────────────────────────────────────
publishedAt: "YYYY-MM-DD"
status: published         # draft | published | archived

relatedTerms:
  - related-term-slug     # slugs of other glossary entries

citations:
  - id: author-year
    title: "Source Title"
    source: "Publisher or Organisation"
    url: "https://example.com/source"
    type: report          # report | article | legislation | dataset | other
---

Extended explanation or context for the term, if needed. The frontmatter `definition`
is the short version used in cards and tooltips. This body content can give a fuller account.

For example, you might explain the origin of the term, common misconceptions, or
how usage varies across different communities.
