---
# REQUIRED FIELDS ────────────────────────────────────────────────────────────
title: "Policy Option Title"
description: "One or two sentences describing this policy option. Used in page meta and listing cards."
summary: "A single sentence describing the policy's core proposal."
publishedAt: "YYYY-MM-DD"
status: published         # draft | published | archived | adopted | rejected
type: policy              # must be exactly 'policy'
contentLabel: policy-brief  # explainer | analysis | policy-brief | debate-summary
evidenceStrength: moderate  # strong | moderate | emerging | contested

# Problem and solution are required for policy pages
problemStatement: "Describe the specific problem this policy is designed to address. Be concrete — quantify where possible."
proposedSolution: "Describe the policy mechanism, its scope, and what outcomes it aims to produce."

# OPTIONAL FIELDS ─────────────────────────────────────────────────────────────
updatedAt: "YYYY-MM-DD"
tags:
  - tag-one
  - tag-two

# Trade-offs section (optional but strongly encouraged)
tradeoffs:
  pros:
    - Specific advantage one
    - Specific advantage two
  cons:
    - Specific disadvantage one
    - Specific disadvantage two

# FAQs — anticipated questions from readers or critics
faqs:
  - question: "What problem does this solve?"
    answer: "Answer here."
  - question: "Who funds it?"
    answer: "Answer here."

# Cross-references (use slugs, not titles)
relatedExplainers:
  - explainer-slug
relatedPilots:
  - pilot-slug

# CITATIONS ───────────────────────────────────────────────────────────────────
citations:
  - id: author-year
    title: "Publication Title"
    author: "Author Name"
    publishedAt: "YYYY-MM-DD"
    source: "Publisher or Organisation"
    url: "https://example.com/source"
    type: report              # report | article | legislation | dataset | other
---

## Policy Summary

Summarise what this policy proposes and what it is intended to achieve.

## Key Provisions

List the concrete provisions of the policy:

- **Duration / scope**: …
- **Beneficiaries**: …
- **Funding mechanism**: …
- **Governance**: …

## What the Evidence Says

Describe the evidence base for this type of policy. Reference specific pilots or studies. Be honest about evidence gaps.

## Trade-offs

Discuss the strongest arguments for and against this policy. Acknowledge genuine uncertainty.

## Open Questions

List the key questions policymakers and researchers would need to resolve before or during implementation.

## Related Resources

- [Related Explainer](/explainers/explainer-slug)
- [Related Pilot](/pilots/pilot-slug)
