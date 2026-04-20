import { NextRequest, NextResponse } from 'next/server'

type SubmissionType = 'volunteer' | 'partner' | 'local-organizer' | 'pilot-submission'

interface SubmissionPayload {
  type: SubmissionType
  name: string
  email: string
  [key: string]: unknown
}

const requiredFields: Record<SubmissionType, string[]> = {
  volunteer: ['name', 'email', 'location', 'availability'],
  partner: ['name', 'email', 'organisation', 'role', 'interest'],
  'local-organizer': ['name', 'email', 'location', 'groupType', 'topicInterest'],
  'pilot-submission': ['name', 'email', 'pilotName', 'location', 'phase', 'description'],
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

  const payload = body as SubmissionPayload

  // Validate type
  const validTypes: SubmissionType[] = [
    'volunteer',
    'partner',
    'local-organizer',
    'pilot-submission',
  ]
  if (!payload.type || !validTypes.includes(payload.type)) {
    return NextResponse.json({ error: 'Invalid submission type' }, { status: 400 })
  }

  // Validate required fields
  const required = requiredFields[payload.type]
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

  // Validate email format
  if (!isValidEmail(payload.email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  // In production, this would deliver the submission to an email or storage destination.
  // The SUBMISSION_DESTINATION environment variable controls where submissions are sent.
  // Currently logs the submission for development/testing.
  const destination = process.env.SUBMISSION_DESTINATION ?? 'console'

  if (destination === 'console') {
    console.info('[Form submission]', {
      type: payload.type,
      name: payload.name,
      email: payload.email,
      receivedAt: new Date().toISOString(),
    })
  }

  return NextResponse.json(
    {
      success: true,
      message: 'Submission received',
      type: payload.type,
    },
    { status: 200 }
  )
}
