---
# REQUIRED FIELDS ────────────────────────────────────────────────────────────
title: "Action Title"
description: "One or two sentences describing this action. Used in page meta and listing cards."
publishedAt: "YYYY-MM-DD"
status: published         # draft | published | archived
type: action              # must be exactly 'action'
actionType: campaign      # campaign | event | petition | volunteer | local-action | toolkit | other

# OPTIONAL FIELDS ─────────────────────────────────────────────────────────────
updatedAt: "YYYY-MM-DD"
tags:
  - tag-one
  - tag-two

organizer: "Organisation Name"
partner: "Partner Organisation"
featured: false

# Dates and location
startDate: "YYYY-MM-DD"
endDate: "YYYY-MM-DD"     # omit for open-ended actions
location: "City or Region, or 'National' or 'Online'"
isRemote: false           # true if the action is fully remote/online

# Links
url: "https://example.com/action"
signupUrl: "https://example.com/action/signup"

# Steps (optional but useful for toolkits and campaigns)
steps:
  - Step one — describe clearly what someone should do
  - Step two
  - Step three

schedule: "Describe timing, e.g. 'Monthly calls — first Tuesday, 7pm GMT'"

# Cross-references (use slugs, not titles)
relatedExplainers:
  - explainer-slug
relatedPolicy:
  - policy-slug
relatedPilots:
  - pilot-slug
---

## Why This Action Matters

Explain the context and urgency. What problem does this action address? Why should someone get involved now?

## What We're Asking For

Be specific. What outcome are you trying to achieve? Who needs to act, and by when?

## What's Already Working

Reference evidence from related pilots or explainers. Use relative links:
- [Related Pilot](/pilots/pilot-slug)
- [Related Explainer](/explainers/explainer-slug)

## How to Get Involved

Use the steps listed in the frontmatter above, or expand them here with more detail.

If there is a signup URL, direct people to it at the end of this section.
