# Public Future Initiative — Launch Checklist

This checklist defines the minimum readiness bar for the first public release.
Each item should be verified before launch by a team member and signed off.

---

## 1. Content Readiness

- [ ] All published explainers have `status: published`, a title, description, and at least one citation
- [ ] All published policy pages have `status: published`, a valid `evidenceStrength`, and at least one of `problemStatement` / `proposedSolution`
- [ ] All published pilots have `status: published`, a `location`, and an `outcome` value
- [ ] All published actions have `status: published`, a valid `actionType`, and a description
- [ ] Glossary entries are consistent with terms used in explainers and policy pages
- [ ] Timeline content is accurate and published
- [ ] No placeholder or lorem-ipsum text appears in any published content
- [ ] All citation URLs are live and accurate
- [ ] Content has been reviewed by at least one editor before publishing
- [ ] Run `npm run validate` and confirm no errors

---

## 2. Trust & Governance Pages

- [ ] `/trust-center` is published and accurate
- [ ] `/editorial-standards` is published
- [ ] `/methodology` is published
- [ ] `/governance` is published
- [ ] `/moderation` is published
- [ ] `/corrections` is published
- [ ] `/about/mission` is published
- [ ] `/about/team` lists real people with accurate bios
- [ ] `/about/advisors` is accurate (or removed if not ready)
- [ ] `/partners` is accurate
- [ ] `/privacy` is up to date

---

## 3. Forms & Integrations

- [ ] Newsletter signup (`/api/newsletter`) submits without errors and confirmation message is shown
- [ ] Contact form (`/api/contact`) — all four tabs (General, Media, Partner, Speaking) submit and show confirmation
- [ ] Get Involved forms (`/api/submit`) — volunteer, partner, local organiser, pilot submission — all submit and show confirmation
- [ ] All form fields have visible labels (or appropriate `aria-label`)
- [ ] Error states are shown correctly for invalid submissions
- [ ] API endpoints return appropriate error responses for malformed requests
- [ ] Confirm all form submissions reach the intended destination (email / CRM / spreadsheet)

---

## 4. Analytics

- [ ] Analytics provider (e.g. Plausible) script is included in `app/layout.tsx`
- [ ] `trackEvent` calls fire in production for: `newsletter_signup`, `volunteer_form_submit`, `partner_inquiry_submit`, `local_organizer_form_submit`, `pilot_submission_submit`, `contact_form_submit`, `event_registration_click`, `pilot_signup_click`
- [ ] Analytics dashboard is accessible and showing real data
- [ ] No personally identifiable information (PII) is sent to analytics
- [ ] Privacy policy accurately describes data collected

---

## 5. SEO & Metadata

- [ ] `/sitemap.xml` is accessible and returns all major routes
- [ ] `/robots.txt` is accessible and allows crawling of all public pages
- [ ] Homepage has correct `<title>`, `<meta description>`, and OG tags
- [ ] Explainer, policy, pilot, and action detail pages each emit correct `<title>`, `<meta description>`, Open Graph, and Twitter card metadata
- [ ] `metadataBase` is set to the production domain in `app/layout.tsx`
- [ ] `siteMetadata.siteUrl` in `lib/metadata.ts` is set to the production domain
- [ ] OG image (`/og-image.png`) exists in `/public` at 1200×630px
- [ ] No pages emit duplicate or missing `<h1>` tags
- [ ] Schema markup (if implemented) is validated with Google's Rich Results Test

---

## 6. Performance

- [ ] Lighthouse performance score ≥ 80 on mobile for homepage and a representative content page
- [ ] Lighthouse performance score ≥ 90 on desktop for homepage
- [ ] Core Web Vitals pass: LCP < 2.5s, CLS < 0.1, FID/INP < 200ms
- [ ] All images use `next/image` with width, height, and `alt` attributes
- [ ] No images larger than 500 KB are loaded on initial render
- [ ] Fonts are loaded efficiently (preconnect / preload or `next/font`)
- [ ] JavaScript bundle size is reviewed — no unexpectedly large dependencies

---

## 7. Accessibility

- [ ] Skip-to-main-content link is present and functional
- [ ] All pages pass keyboard navigation (Tab through all interactive elements, Enter/Space activates them)
- [ ] Focus indicators are visible on all interactive elements
- [ ] Heading hierarchy is correct (one `<h1>` per page, `<h2>` → `<h3>` in logical order)
- [ ] All images have meaningful `alt` attributes (or `alt=""` for decorative images)
- [ ] All form inputs have associated `<label>` elements or `aria-label`
- [ ] Error messages are associated with their inputs via `aria-describedby`
- [ ] Colour contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text/UI components)
- [ ] No content relies on colour alone to convey meaning
- [ ] ARIA roles are correct and not redundant
- [ ] Spot-check with a screen reader (e.g. NVDA/VoiceOver) on homepage, an explainer, and a form
- [ ] Run automated accessibility scan (e.g. axe DevTools) on homepage and get-involved page

---

## 8. Responsive QA

- [ ] Homepage renders correctly at 375px, 768px, and 1280px viewports
- [ ] Navigation mobile menu opens and closes correctly
- [ ] All directory pages (explainers, policy, pilots, actions) render correctly on mobile
- [ ] Detail pages are readable on mobile with no horizontal overflow
- [ ] Forms are usable on mobile (inputs are large enough, keyboard doesn't obscure content)
- [ ] Search page works on mobile

---

## 9. Error Pages & Fallbacks

- [ ] `404` page (`not-found.tsx`) is styled and provides helpful navigation options
- [ ] `500` / error boundary is in place for unexpected server errors
- [ ] Empty state handling is correct on all directory pages (shows useful message, not blank)
- [ ] Content loading fallbacks (Suspense) are in place for client-rendered sections

---

## 10. Technical / Infrastructure

- [ ] Production build passes without TypeScript errors (`npm run typecheck`)
- [ ] Production build passes linting (`npm run lint`)
- [ ] All tests pass (`npm run test`)
- [ ] `siteMetadata.siteUrl` is set to the production domain (not localhost)
- [ ] No `.env.local` secrets are committed to the repository
- [ ] Environment variables used in production are set in the deployment platform
- [ ] HTTPS is configured and all HTTP traffic redirects to HTTPS
- [ ] Custom domain DNS is configured correctly
- [ ] Deployment pipeline (CI/CD) is running and last build is green

---

## 11. Final Spot-Check (pre-launch)

Complete this walkthrough on the staging/preview environment immediately before go-live:

- [ ] Load homepage — check hero, nav, sections, newsletter, footer
- [ ] Navigate to `/explainers`, open one explainer — read, check citations, check newsletter
- [ ] Navigate to `/policy`, open one policy page — check tradeoffs, FAQs, evidence rating
- [ ] Navigate to `/pilots`, open one pilot — check quick facts, lessons, evidence summary
- [ ] Navigate to `/actions`, open one action — check CTA, registration
- [ ] Submit the newsletter signup form
- [ ] Submit the contact form (general tab)
- [ ] Submit the volunteer form from `/get-involved`
- [ ] Perform a search query from the `/search` page
- [ ] Check `/trust-center`, `/editorial-standards`, `/methodology`
- [ ] Visit a non-existent URL — confirm 404 page
- [ ] Check `/sitemap.xml` and `/robots.txt` resolve correctly

---

*Last updated: 2026-04-20*
*This checklist should be reviewed before every significant release.*
