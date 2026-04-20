---
# REQUIRED FIELDS ────────────────────────────────────────────────────────────
title: "Event Title"
year: "YYYY"              # four-digit year (required for timeline ordering)
description: "One or two sentences describing this event. Used in timeline cards."

# OPTIONAL FIELDS ─────────────────────────────────────────────────────────────
publishedAt: "YYYY-MM-DD"
status: published         # draft | published | archived
location: "City, Country or 'Global'"
outcome: "Brief one-line outcome, e.g. 'Pilot launched with 125 participants'"

tags:
  - tag-one
  - tag-two

citations:
  - id: author-year
    title: "Source Title"
    source: "Publisher or Organisation"
    url: "https://example.com/source"
    type: report          # report | article | legislation | dataset | other
---

Optional extended description of the event. The frontmatter `description` is
used in timeline list views. This body content is displayed on the detail page.

Provide context for why this event matters in the broader story of economic
transition and future-of-work policy.
