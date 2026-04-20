---
# REQUIRED FIELDS ────────────────────────────────────────────────────────────
title: "Your Explainer Title"
description: "One or two sentences describing what this explainer covers. Used in page meta and listing cards."
summary: "A single sentence suitable for a callout or preview card. Should stand alone without context."
publishedAt: "YYYY-MM-DD"
status: published         # draft | published | archived
type: explainer           # must be exactly 'explainer'

# OPTIONAL FIELDS ─────────────────────────────────────────────────────────────
updatedAt: "YYYY-MM-DD"   # include whenever you revise existing content
tags:
  - tag-one
  - tag-two

# Cross-references (use slugs, not titles)
relatedPolicy:
  - policy-slug
relatedPilots:
  - pilot-slug

# CITATIONS ───────────────────────────────────────────────────────────────────
# Every factual claim should be traceable to at least one citation.
# Each citation needs: id, title, source, type. Other fields are encouraged.
citations:
  - id: author-year           # unique within this file, e.g. standing-2017
    title: "Publication Title"
    author: "Author Name"
    publishedAt: "YYYY-MM-DD"
    source: "Publisher or Organisation"
    url: "https://example.com/source"
    type: report              # report | article | legislation | dataset | other
---

## What Is [Topic]?

Introduce the topic in plain language. Assume no prior knowledge. Avoid jargon in the first paragraph.

## Why It Matters

Explain the stakes. Who is affected and how? What problem does this topic address?

## How It Works

Describe the mechanism, policy structure, or key concept in detail. Use subheadings for clarity.

## Evidence and Debates

Summarise what the evidence shows and where genuine uncertainty or disagreement exists. Reference citations using the IDs above — e.g. `[standing-2017]`.

Acknowledge contested claims honestly. Use the `contentLabel` value in policy pages to signal the type of analysis.

## Key Terms

Define any technical terms or acronyms introduced in the explainer.

## Further Reading

Link to related explainers, pilots, or policy pages using relative paths:

- [Related Explainer](/explainers/related-slug)
- [Related Pilot](/pilots/pilot-slug)
