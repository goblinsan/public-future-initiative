# Analytics Events Reference

This document lists every conversion event tracked by the Public Future Initiative site.
Events are dispatched via `lib/analytics.ts` → `trackEvent()`.

In production, events are forwarded to **Plausible Analytics** (or another provider configured
in `lib/analytics.ts`). In development they are printed to the browser console.

---

## Event catalogue

### `newsletter_signup`

Fired when a visitor successfully subscribes via any `NewsletterSignup` component.

| Property   | Type   | Values / notes |
|------------|--------|----------------|
| `location` | string | Where on the site the signup occurred. See placements below. |

**Placement values for `location`:**

| Value               | Where |
|---------------------|-------|
| `homepage`          | Newsletter section on the homepage |
| `footer`            | Footer newsletter widget |
| `explainer-inline`  | Inline block at the bottom of each explainer article |
| `actions-page`      | Newsletter block on the Take Action page |

---

### `volunteer_form_submit`

Fired when a volunteer expression-of-interest form is successfully submitted on `/get-involved`.

No custom properties.

---

### `partner_inquiry_submit`

Fired when a partner enquiry form is successfully submitted on `/get-involved`.

No custom properties.

---

### `local_organizer_form_submit`

Fired when a local organiser registration form is successfully submitted on `/get-involved`.

No custom properties.

---

### `pilot_submission_submit`

Fired when a pilot-submission form is successfully submitted on `/get-involved`.

No custom properties.

---

### `contact_form_submit`

Fired when any contact form is successfully submitted on `/contact`.

| Property | Type   | Values / notes |
|----------|--------|----------------|
| `type`   | string | `general` · `media` · `partner` · `speaking` |

---

### `event_registration_click`

Fired when a visitor clicks an external event-registration link on an action detail page.

| Property       | Type   | Notes |
|----------------|--------|-------|
| `actionSlug`   | string | Slug of the action content item |
| `actionTitle`  | string | Display title of the action |

> **Implementation note:** Wire this event to external registration link clicks in
> `app/actions/[slug]/page.tsx` when those links are rendered.

---

### `pilot_signup_click`

Fired when a visitor clicks an external pilot-engagement link on a pilot detail page.

| Property     | Type   | Notes |
|--------------|--------|-------|
| `pilotSlug`  | string | Slug of the pilot content item |
| `pilotTitle` | string | Display title of the pilot |

> **Implementation note:** Wire this event to `engagementUrl` link clicks in
> `app/pilots/[slug]/page.tsx`.

---

## Adding new events

1. Add the event union member to `AnalyticsEvent` in `lib/analytics.ts`.
2. Call `trackEvent({ name: '...' })` at the appropriate point in a client component.
3. Document the event in this file.
