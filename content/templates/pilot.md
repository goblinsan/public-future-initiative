---
# REQUIRED FIELDS ────────────────────────────────────────────────────────────
title: "Pilot Programme Name"
description: "One or two sentences describing this pilot. Used in page meta and listing cards."
publishedAt: "YYYY-MM-DD"
status: published         # draft | published | archived
type: pilot               # must be exactly 'pilot'
location: "City, Country"

# OPTIONAL FIELDS ─────────────────────────────────────────────────────────────
updatedAt: "YYYY-MM-DD"
region: "Europe"          # e.g. North America | Europe | Africa | Asia | Oceania
theme:
  - guaranteed-income     # use consistent slugified theme labels
featured: false

partners:
  - Organisation Name
  - University or Research Body

startDate: "YYYY-MM-DD"
endDate: "YYYY-MM-DD"     # omit if ongoing
outcome: ongoing          # ongoing | success | partial | failed | cancelled
evidenceStrength: emerging # strong | moderate | emerging | contested

engagementUrl: "https://example.com/pilot"

limitations:
  - Describe a key limitation of this study or pilot
  - Small sample size, short duration, self-selection bias, etc.

lessonsLearned:
  - Key finding or lesson one
  - Key finding or lesson two

tags:
  - tag-one
  - tag-two

# Cross-references (use slugs, not titles)
relatedPolicy:
  - policy-slug
relatedActions:
  - action-slug

# CITATIONS ───────────────────────────────────────────────────────────────────
citations:
  - id: author-year
    title: "Evaluation Report Title"
    source: "Research Institution"
    publishedAt: "YYYY-MM-DD"
    url: "https://example.com/report"
    type: report              # report | article | legislation | dataset | other
---

## Overview

Describe the pilot: what it was testing, who ran it, and when it ran. Include key numbers (participants, payment amounts, duration).

## What Was Tested

Explain the specific hypothesis or policy question the pilot was designed to answer. What conditions were set up?

## What Happened

Describe the results. What changed for participants? Use data where available.

## Key Findings

- **Finding one** — quantify where possible
- **Finding two** — note direction of effect (increased / decreased / no change)
- **Finding three**

## Limitations

Be explicit about what this pilot cannot prove. Small pilots, atypical populations, and short durations all limit generalisability.

## Lessons for Policy

What should policymakers take from this pilot? What would need to change for a larger programme?
