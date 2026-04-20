import { NextRequest, NextResponse } from 'next/server'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = body as { email?: unknown; location?: unknown }

  if (!payload.email || typeof payload.email !== 'string' || !isValidEmail(payload.email)) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
  }

  // Sanitise optional location label (used only for logging / analytics context)
  const location =
    typeof payload.location === 'string' ? payload.location.slice(0, 64) : 'unknown'

  // In production, forward the subscription to your email provider via the
  // NEWSLETTER_DESTINATION environment variable (e.g. a Mailchimp or ConvertKit
  // API endpoint). Currently logs the signup for development/testing.
  const destination = process.env.NEWSLETTER_DESTINATION ?? 'console'

  if (destination === 'console') {
    console.info('[Newsletter signup]', {
      email: payload.email,
      location,
      receivedAt: new Date().toISOString(),
    })
  }

  return NextResponse.json({ success: true, message: 'Subscription received' }, { status: 200 })
}
