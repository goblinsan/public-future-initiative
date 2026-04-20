/**
 * Lightweight analytics utility for tracking high-value conversion events.
 *
 * In production, replace the `dispatch` function body to send events to your
 * analytics provider (e.g. Plausible, Fathom, GA4, or Segment).
 *
 * All tracked event names and their properties are documented in
 * docs/analytics-events.md.
 */

export type AnalyticsEvent =
  | { name: 'newsletter_signup'; props?: { location?: string } }
  | { name: 'volunteer_form_submit'; props?: Record<string, string> }
  | { name: 'partner_inquiry_submit'; props?: Record<string, string> }
  | { name: 'local_organizer_form_submit'; props?: Record<string, string> }
  | { name: 'pilot_submission_submit'; props?: Record<string, string> }
  | { name: 'contact_form_submit'; props?: { type?: string } }
  | { name: 'event_registration_click'; props?: { actionSlug?: string; actionTitle?: string } }
  | { name: 'pilot_signup_click'; props?: { pilotSlug?: string; pilotTitle?: string } }

/**
 * Send a named analytics event with optional properties.
 *
 * Safe to call server-side (no-op) or before the analytics script has loaded.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return

  // Forward to window.plausible if available (Plausible Analytics)
  if (typeof (window as Window & { plausible?: (name: string, opts?: { props?: Record<string, unknown> }) => void }).plausible === 'function') {
    const win = window as unknown as { plausible: (name: string, opts?: { props?: Record<string, unknown> }) => void }
    win.plausible(event.name, event.props ? { props: event.props as Record<string, unknown> } : undefined)
    return
  }

  // Fallback: structured console log for development / testing
  if (process.env.NODE_ENV !== 'production') {
    console.info('[analytics]', event.name, event.props ?? {})
  }
}
