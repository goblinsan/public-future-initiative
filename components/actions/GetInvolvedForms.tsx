'use client'

import { useState, FormEvent } from 'react'
import { trackEvent } from '@/lib/analytics'

type FormType = 'volunteer' | 'partner' | 'local-organizer' | 'pilot-submission'

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
}

interface VolunteerFields {
  name: string
  email: string
  location: string
  availability: string
  background: string
}

interface PartnerFields {
  name: string
  email: string
  organisation: string
  role: string
  interest: string
}

interface LocalOrganizerFields {
  name: string
  email: string
  location: string
  groupType: string
  topicInterest: string
}

interface PilotSubmissionFields {
  name: string
  email: string
  pilotName: string
  location: string
  description: string
  phase: string
}

const tabs: { id: FormType; label: string; icon: string }[] = [
  { id: 'volunteer', label: 'Volunteer', icon: '🙋' },
  { id: 'partner', label: 'Partner', icon: '🤝' },
  { id: 'local-organizer', label: 'Local Organiser', icon: '📍' },
  { id: 'pilot-submission', label: 'Submit a Pilot', icon: '🔬' },
]

function SuccessMessage({ type, onReset }: { type: FormType; onReset: () => void }) {
  const messages: Record<FormType, { title: string; body: string }> = {
    volunteer: {
      title: 'Expression of interest received',
      body: "We'll be in touch within five working days with information about training and next steps.",
    },
    partner: {
      title: 'Partnership enquiry received',
      body: "We'll review your enquiry and respond within ten working days.",
    },
    'local-organizer': {
      title: 'Local organiser registration received',
      body: "We'll send your discussion kit and facilitator guide within five working days.",
    },
    'pilot-submission': {
      title: 'Pilot submission received',
      body: "We'll review your submission and be in touch within ten working days.",
    },
  }

  const { title, body } = messages[type]

  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 text-2xl mb-6">
        ✓
      </div>
      <h3 className="font-serif text-heading-lg text-brand-navy mb-3">{title}</h3>
      <p className="text-body-md text-slate-600 max-w-md mx-auto mb-8">{body}</p>
      <button onClick={onReset} className="btn-outline">
        Submit another
      </button>
    </div>
  )
}

function FieldGroup({
  label,
  id,
  required,
  children,
}: {
  label: string
  id: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-body-sm font-medium text-brand-navy mb-1.5">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full border border-slate-200 rounded-md px-4 py-2.5 text-body-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors'

const textareaClass = `${inputClass} resize-none`

function VolunteerForm({ onSuccess }: { onSuccess: () => void }) {
  const [fields, setFields] = useState<VolunteerFields>({
    name: '',
    email: '',
    location: '',
    availability: '',
    background: '',
  })
  const [state, setState] = useState<FormState>({ status: 'idle' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setState({ status: 'submitting' })
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'volunteer', ...fields }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setState({ status: 'success' })
      trackEvent({ name: 'volunteer_form_submit' })
      onSuccess()
    } catch {
      setState({ status: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-6">
        <FieldGroup label="Full name" id="vol-name" required>
          <input
            id="vol-name"
            type="text"
            required
            value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
            className={inputClass}
            placeholder="Your name"
          />
        </FieldGroup>
        <FieldGroup label="Email address" id="vol-email" required>
          <input
            id="vol-email"
            type="email"
            required
            value={fields.email}
            onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
            placeholder="you@example.com"
          />
        </FieldGroup>
      </div>

      <FieldGroup label="Your location (city, region, or country)" id="vol-location" required>
        <input
          id="vol-location"
          type="text"
          required
          value={fields.location}
          onChange={(e) => setFields((f) => ({ ...f, location: e.target.value }))}
          className={inputClass}
          placeholder="e.g. Manchester, UK"
        />
      </FieldGroup>

      <FieldGroup label="Availability" id="vol-availability" required>
        <select
          id="vol-availability"
          required
          value={fields.availability}
          onChange={(e) => setFields((f) => ({ ...f, availability: e.target.value }))}
          className={inputClass}
        >
          <option value="">Select availability</option>
          <option value="occasional">Occasional — a few hours per month</option>
          <option value="regular">Regular — several hours per month</option>
          <option value="substantial">Substantial — multiple hours per week</option>
        </select>
      </FieldGroup>

      <FieldGroup
        label="Brief background — what experience or perspective do you bring?"
        id="vol-background"
      >
        <textarea
          id="vol-background"
          rows={4}
          value={fields.background}
          onChange={(e) => setFields((f) => ({ ...f, background: e.target.value }))}
          className={textareaClass}
          placeholder="No specific expertise needed — we want facilitators with a range of backgrounds."
        />
      </FieldGroup>

      {state.status === 'error' && (
        <p className="text-rose-600 text-body-sm">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className="btn-primary"
      >
        {state.status === 'submitting' ? 'Submitting…' : 'Submit expression of interest'}
      </button>
    </form>
  )
}

function PartnerForm({ onSuccess }: { onSuccess: () => void }) {
  const [fields, setFields] = useState<PartnerFields>({
    name: '',
    email: '',
    organisation: '',
    role: '',
    interest: '',
  })
  const [state, setState] = useState<FormState>({ status: 'idle' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setState({ status: 'submitting' })
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'partner', ...fields }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setState({ status: 'success' })
      trackEvent({ name: 'partner_inquiry_submit' })
      onSuccess()
    } catch {
      setState({ status: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-6">
        <FieldGroup label="Your name" id="partner-name" required>
          <input
            id="partner-name"
            type="text"
            required
            value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
            className={inputClass}
            placeholder="Your name"
          />
        </FieldGroup>
        <FieldGroup label="Email address" id="partner-email" required>
          <input
            id="partner-email"
            type="email"
            required
            value={fields.email}
            onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
            placeholder="you@organisation.org"
          />
        </FieldGroup>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <FieldGroup label="Organisation" id="partner-org" required>
          <input
            id="partner-org"
            type="text"
            required
            value={fields.organisation}
            onChange={(e) => setFields((f) => ({ ...f, organisation: e.target.value }))}
            className={inputClass}
            placeholder="Organisation name"
          />
        </FieldGroup>
        <FieldGroup label="Your role" id="partner-role" required>
          <input
            id="partner-role"
            type="text"
            required
            value={fields.role}
            onChange={(e) => setFields((f) => ({ ...f, role: e.target.value }))}
            className={inputClass}
            placeholder="Job title or role"
          />
        </FieldGroup>
      </div>

      <FieldGroup
        label="What kind of partnership are you interested in?"
        id="partner-interest"
        required
      >
        <textarea
          id="partner-interest"
          rows={5}
          required
          value={fields.interest}
          onChange={(e) => setFields((f) => ({ ...f, interest: e.target.value }))}
          className={textareaClass}
          placeholder="Describe the collaboration you have in mind — research, events, content, funding, or something else."
        />
      </FieldGroup>

      {state.status === 'error' && (
        <p className="text-rose-600 text-body-sm">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className="btn-primary"
      >
        {state.status === 'submitting' ? 'Submitting…' : 'Submit partner enquiry'}
      </button>
    </form>
  )
}

function LocalOrganizerForm({ onSuccess }: { onSuccess: () => void }) {
  const [fields, setFields] = useState<LocalOrganizerFields>({
    name: '',
    email: '',
    location: '',
    groupType: '',
    topicInterest: '',
  })
  const [state, setState] = useState<FormState>({ status: 'idle' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setState({ status: 'submitting' })
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'local-organizer', ...fields }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setState({ status: 'success' })
      trackEvent({ name: 'local_organizer_form_submit' })
      onSuccess()
    } catch {
      setState({ status: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-6">
        <FieldGroup label="Your name" id="lo-name" required>
          <input
            id="lo-name"
            type="text"
            required
            value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
            className={inputClass}
            placeholder="Your name"
          />
        </FieldGroup>
        <FieldGroup label="Email address" id="lo-email" required>
          <input
            id="lo-email"
            type="email"
            required
            value={fields.email}
            onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
            placeholder="you@example.com"
          />
        </FieldGroup>
      </div>

      <FieldGroup
        label="Location (city or region where you want to organise)"
        id="lo-location"
        required
      >
        <input
          id="lo-location"
          type="text"
          required
          value={fields.location}
          onChange={(e) => setFields((f) => ({ ...f, location: e.target.value }))}
          className={inputClass}
          placeholder="e.g. West Midlands, UK"
        />
      </FieldGroup>

      <FieldGroup
        label="Type of group you want to host a discussion with"
        id="lo-group-type"
        required
      >
        <select
          id="lo-group-type"
          required
          value={fields.groupType}
          onChange={(e) => setFields((f) => ({ ...f, groupType: e.target.value }))}
          className={inputClass}
        >
          <option value="">Select group type</option>
          <option value="community-association">Community or residents&apos; association</option>
          <option value="faith-group">Faith group</option>
          <option value="trade-union">Trade union or workers&apos; group</option>
          <option value="workplace">Workplace team</option>
          <option value="school-college">School or college</option>
          <option value="library-centre">Library or community centre</option>
          <option value="informal">Informal group of friends or neighbours</option>
          <option value="other">Other</option>
        </select>
      </FieldGroup>

      <FieldGroup
        label="Which topic are you most interested in discussing?"
        id="lo-topic"
        required
      >
        <select
          id="lo-topic"
          required
          value={fields.topicInterest}
          onChange={(e) => setFields((f) => ({ ...f, topicInterest: e.target.value }))}
          className={inputClass}
        >
          <option value="">Select a topic</option>
          <option value="income-work">Guaranteed income and work</option>
          <option value="housing">Housing and planning</option>
          <option value="ai-automation">AI and the future of work</option>
          <option value="climate">Climate policy and energy</option>
          <option value="healthcare">Healthcare access</option>
          <option value="other">Other / not sure yet</option>
        </select>
      </FieldGroup>

      {state.status === 'error' && (
        <p className="text-rose-600 text-body-sm">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className="btn-primary"
      >
        {state.status === 'submitting' ? 'Submitting…' : 'Request discussion kit'}
      </button>
    </form>
  )
}

function PilotSubmissionForm({ onSuccess }: { onSuccess: () => void }) {
  const [fields, setFields] = useState<PilotSubmissionFields>({
    name: '',
    email: '',
    pilotName: '',
    location: '',
    description: '',
    phase: '',
  })
  const [state, setState] = useState<FormState>({ status: 'idle' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setState({ status: 'submitting' })
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'pilot-submission', ...fields }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setState({ status: 'success' })
      trackEvent({ name: 'pilot_submission_submit' })
      onSuccess()
    } catch {
      setState({ status: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-6">
        <FieldGroup label="Your name" id="ps-name" required>
          <input
            id="ps-name"
            type="text"
            required
            value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
            className={inputClass}
            placeholder="Your name"
          />
        </FieldGroup>
        <FieldGroup label="Email address" id="ps-email" required>
          <input
            id="ps-email"
            type="email"
            required
            value={fields.email}
            onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
            placeholder="you@example.com"
          />
        </FieldGroup>
      </div>

      <FieldGroup label="Pilot or initiative name" id="ps-pilot-name" required>
        <input
          id="ps-pilot-name"
          type="text"
          required
          value={fields.pilotName}
          onChange={(e) => setFields((f) => ({ ...f, pilotName: e.target.value }))}
          className={inputClass}
          placeholder="Name of the programme or experiment"
        />
      </FieldGroup>

      <FieldGroup label="Location" id="ps-location" required>
        <input
          id="ps-location"
          type="text"
          required
          value={fields.location}
          onChange={(e) => setFields((f) => ({ ...f, location: e.target.value }))}
          className={inputClass}
          placeholder="City, region, or country"
        />
      </FieldGroup>

      <FieldGroup label="Current phase" id="ps-phase" required>
        <select
          id="ps-phase"
          required
          value={fields.phase}
          onChange={(e) => setFields((f) => ({ ...f, phase: e.target.value }))}
          className={inputClass}
        >
          <option value="">Select phase</option>
          <option value="planning">Planning — not yet started</option>
          <option value="active">Active — currently running</option>
          <option value="completed">Completed — with results available</option>
          <option value="cancelled">Cancelled or paused</option>
        </select>
      </FieldGroup>

      <FieldGroup
        label="Brief description — what is being tested, who is involved, and what outcomes are tracked?"
        id="ps-description"
        required
      >
        <textarea
          id="ps-description"
          rows={5}
          required
          value={fields.description}
          onChange={(e) => setFields((f) => ({ ...f, description: e.target.value }))}
          className={textareaClass}
          placeholder="Include links to published reports or evaluation data if available."
        />
      </FieldGroup>

      {state.status === 'error' && (
        <p className="text-rose-600 text-body-sm">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className="btn-primary"
      >
        {state.status === 'submitting' ? 'Submitting…' : 'Submit pilot for consideration'}
      </button>
    </form>
  )
}

export default function GetInvolvedForms() {
  const [activeTab, setActiveTab] = useState<FormType>('volunteer')
  const [succeeded, setSucceeded] = useState(false)

  function handleSuccess() {
    setSucceeded(true)
  }

  function handleReset() {
    setSucceeded(false)
  }

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id)
              setSucceeded(false)
            }}
            className={`text-label-sm px-4 py-2 rounded-md border transition-colors ${
              activeTab === id
                ? 'bg-brand-navy text-white border-brand-navy'
                : 'bg-white text-slate-700 border-slate-200 hover:border-brand-blue/40'
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Form content */}
      {succeeded ? (
        <SuccessMessage type={activeTab} onReset={handleReset} />
      ) : (
        <>
          {activeTab === 'volunteer' && <VolunteerForm onSuccess={handleSuccess} />}
          {activeTab === 'partner' && <PartnerForm onSuccess={handleSuccess} />}
          {activeTab === 'local-organizer' && <LocalOrganizerForm onSuccess={handleSuccess} />}
          {activeTab === 'pilot-submission' && <PilotSubmissionForm onSuccess={handleSuccess} />}
        </>
      )}
    </div>
  )
}
