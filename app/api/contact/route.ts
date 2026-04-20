import { NextRequest, NextResponse } from 'next/server'

type ContactType = 'general' | 'media' | 'partner' | 'speaking'

interface ContactPayload {
  type: ContactType
  name: string
  email: string
  organisation?: string
  message: string
}

const requiredFields: Record<ContactType, (keyof ContactPayload)[]> = {
  general: ['name', 'email', 'message'],
  media: ['name', 'email', 'organisation', 'message'],
  partner: ['name', 'email', 'organisation', 'message'],
  speaking: ['name', 'email', 'message'],
}

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

  const payload = body as Record<string, unknown>

  // Validate type
  const validTypes: ContactType[] = ['general', 'media', 'partner', 'speaking']
  if (!payload.type || !validTypes.includes(payload.type as ContactType)) {
    return NextResponse.json({ error: 'Invalid contact type' }, { status: 400 })
  }

  const contactType = payload.type as ContactType
  const required = requiredFields[contactType]

  const missing = required.filter((field) => {
    const value = payload[field]
    return !value || (typeof value === 'string' && value.trim() === '')
  })

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(', ')}` },
      { status: 400 }
    )
  }

  if (typeof payload.email !== 'string' || !isValidEmail(payload.email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  // In production, deliver to the address configured in CONTACT_DESTINATION.
  // Currently logs the submission for development/testing.
  const destination = process.env.CONTACT_DESTINATION ?? 'console'

  if (destination === 'console') {
    console.info('[Contact submission]', {
      type: contactType,
      name: payload.name,
      email: payload.email,
      organisation: payload.organisation ?? null,
      receivedAt: new Date().toISOString(),
    })
  }

  return NextResponse.json(
    { success: true, message: 'Message received', type: contactType },
    { status: 200 }
  )
}
