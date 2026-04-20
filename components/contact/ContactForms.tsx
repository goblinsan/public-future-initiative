'use client'

import { useState, FormEvent } from 'react'
import { trackEvent } from '@/lib/analytics'

type ContactType = 'general' | 'media' | 'partner' | 'speaking'

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
}

interface BaseFields {
  name: string
  email: string
  message: string
}

interface OrgFields extends BaseFields {
  organisation: string
}

const tabs: { id: ContactType; label: string; icon: string }[] = [
  { id: 'general', label: 'General', icon: '✉️' },
  { id: 'media', label: 'Media', icon: '📰' },
  { id: 'partner', label: 'Partner', icon: '🤝' },
  { id: 'speaking', label: 'Speaking', icon: '🎤' },
]

const tabDescriptions: Record<ContactType, string> = {
  general: 'Questions about our content, methodology, corrections, or organisation.',
  media: 'Interview requests, press enquiries, and fact-checking for journalists.',
  partner: 'Research collaborations, joint events, content partnerships, or funding discussions.',
  speaking: 'Conference talks, panel appearances, and educational collaborations.',
}

const successMessages: Record<ContactType, { title: string; body: string }> = {
  general: {
    title: 'Message received',
    body: "We read every message and aim to respond within five working days.",
  },
  media: {
    title: 'Media enquiry received',
    body: "Our press contact will respond within two working days.",
  },
  partner: {
    title: 'Partnership enquiry received',
    body: "We'll review your proposal and respond within ten working days.",
  },
  speaking: {
    title: 'Speaking request received',
    body: "We'll review your request and be in touch within five working days.",
  },
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

function SuccessMessage({ type, onReset }: { type: ContactType; onReset: () => void }) {
  const { title, body } = successMessages[type]
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 text-2xl mb-6">
        ✓
      </div>
      <h3 className="font-serif text-heading-lg text-brand-navy mb-3">{title}</h3>
      <p className="text-body-md text-slate-600 max-w-md mx-auto mb-8">{body}</p>
      <button onClick={onReset} className="btn-outline">
        Send another message
      </button>
    </div>
  )
}

function GeneralForm({ onSuccess }: { onSuccess: () => void }) {
  const [fields, setFields] = useState<BaseFields>({ name: '', email: '', message: '' })
  const [state, setState] = useState<FormState>({ status: 'idle' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setState({ status: 'submitting' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'general', ...fields }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setState({ status: 'success' })
      trackEvent({ name: 'contact_form_submit', props: { type: 'general' } })
      onSuccess()
    } catch {
      setState({ status: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-6">
        <FieldGroup label="Your name" id="gen-name" required>
          <input id="gen-name" type="text" required value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
            className={inputClass} placeholder="Your name" />
        </FieldGroup>
        <FieldGroup label="Email address" id="gen-email" required>
          <input id="gen-email" type="email" required value={fields.email}
            onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
            className={inputClass} placeholder="you@example.com" />
        </FieldGroup>
      </div>
      <FieldGroup label="Message" id="gen-message" required>
        <textarea id="gen-message" rows={6} required value={fields.message}
          onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
          className={textareaClass} placeholder="How can we help?" />
      </FieldGroup>
      {state.status === 'error' && (
        <p className="text-rose-600 text-body-sm">{state.message}</p>
      )}
      <button type="submit" disabled={state.status === 'submitting'} className="btn-primary">
        {state.status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

function MediaForm({ onSuccess }: { onSuccess: () => void }) {
  const [fields, setFields] = useState<OrgFields>({ name: '', email: '', organisation: '', message: '' })
  const [state, setState] = useState<FormState>({ status: 'idle' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setState({ status: 'submitting' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'media', ...fields }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setState({ status: 'success' })
      trackEvent({ name: 'contact_form_submit', props: { type: 'media' } })
      onSuccess()
    } catch {
      setState({ status: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-6">
        <FieldGroup label="Your name" id="med-name" required>
          <input id="med-name" type="text" required value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
            className={inputClass} placeholder="Your name" />
        </FieldGroup>
        <FieldGroup label="Email address" id="med-email" required>
          <input id="med-email" type="email" required value={fields.email}
            onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
            className={inputClass} placeholder="you@outlet.com" />
        </FieldGroup>
      </div>
      <FieldGroup label="Publication or outlet" id="med-org" required>
        <input id="med-org" type="text" required value={fields.organisation}
          onChange={(e) => setFields((f) => ({ ...f, organisation: e.target.value }))}
          className={inputClass} placeholder="e.g. The Guardian, BBC, Reuters" />
      </FieldGroup>
      <FieldGroup label="Enquiry" id="med-message" required>
        <textarea id="med-message" rows={5} required value={fields.message}
          onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
          className={textareaClass}
          placeholder="Describe your request — deadline, format, and what you need from us." />
      </FieldGroup>
      {state.status === 'error' && (
        <p className="text-rose-600 text-body-sm">{state.message}</p>
      )}
      <button type="submit" disabled={state.status === 'submitting'} className="btn-primary">
        {state.status === 'submitting' ? 'Sending…' : 'Send media enquiry'}
      </button>
    </form>
  )
}

function PartnerForm({ onSuccess }: { onSuccess: () => void }) {
  const [fields, setFields] = useState<OrgFields>({ name: '', email: '', organisation: '', message: '' })
  const [state, setState] = useState<FormState>({ status: 'idle' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setState({ status: 'submitting' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'partner', ...fields }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setState({ status: 'success' })
      trackEvent({ name: 'contact_form_submit', props: { type: 'partner' } })
      onSuccess()
    } catch {
      setState({ status: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-6">
        <FieldGroup label="Your name" id="par-name" required>
          <input id="par-name" type="text" required value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
            className={inputClass} placeholder="Your name" />
        </FieldGroup>
        <FieldGroup label="Email address" id="par-email" required>
          <input id="par-email" type="email" required value={fields.email}
            onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
            className={inputClass} placeholder="you@organisation.org" />
        </FieldGroup>
      </div>
      <FieldGroup label="Organisation" id="par-org" required>
        <input id="par-org" type="text" required value={fields.organisation}
          onChange={(e) => setFields((f) => ({ ...f, organisation: e.target.value }))}
          className={inputClass} placeholder="Organisation name" />
      </FieldGroup>
      <FieldGroup label="What kind of partnership are you proposing?" id="par-message" required>
        <textarea id="par-message" rows={6} required value={fields.message}
          onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
          className={textareaClass}
          placeholder="Describe the collaboration — research, events, content, funding, or something else." />
      </FieldGroup>
      {state.status === 'error' && (
        <p className="text-rose-600 text-body-sm">{state.message}</p>
      )}
      <button type="submit" disabled={state.status === 'submitting'} className="btn-primary">
        {state.status === 'submitting' ? 'Sending…' : 'Send partner enquiry'}
      </button>
    </form>
  )
}

function SpeakingForm({ onSuccess }: { onSuccess: () => void }) {
  const [fields, setFields] = useState<BaseFields>({ name: '', email: '', message: '' })
  const [state, setState] = useState<FormState>({ status: 'idle' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setState({ status: 'submitting' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'speaking', ...fields }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setState({ status: 'success' })
      trackEvent({ name: 'contact_form_submit', props: { type: 'speaking' } })
      onSuccess()
    } catch {
      setState({ status: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-6">
        <FieldGroup label="Your name" id="spk-name" required>
          <input id="spk-name" type="text" required value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
            className={inputClass} placeholder="Your name" />
        </FieldGroup>
        <FieldGroup label="Email address" id="spk-email" required>
          <input id="spk-email" type="email" required value={fields.email}
            onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
            className={inputClass} placeholder="you@example.com" />
        </FieldGroup>
      </div>
      <FieldGroup label="Event or opportunity details" id="spk-message" required>
        <textarea id="spk-message" rows={6} required value={fields.message}
          onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
          className={textareaClass}
          placeholder="Describe the event — format, audience, date, topic, and what you'd like from us." />
      </FieldGroup>
      {state.status === 'error' && (
        <p className="text-rose-600 text-body-sm">{state.message}</p>
      )}
      <button type="submit" disabled={state.status === 'submitting'} className="btn-primary">
        {state.status === 'submitting' ? 'Sending…' : 'Send speaking request'}
      </button>
    </form>
  )
}

export default function ContactForms() {
  const [activeTab, setActiveTab] = useState<ContactType>('general')
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

      {/* Tab description */}
      {!succeeded && (
        <p className="text-body-sm text-slate-500 mb-6">{tabDescriptions[activeTab]}</p>
      )}

      {/* Form content */}
      {succeeded ? (
        <SuccessMessage type={activeTab} onReset={handleReset} />
      ) : (
        <>
          {activeTab === 'general' && <GeneralForm onSuccess={handleSuccess} />}
          {activeTab === 'media' && <MediaForm onSuccess={handleSuccess} />}
          {activeTab === 'partner' && <PartnerForm onSuccess={handleSuccess} />}
          {activeTab === 'speaking' && <SpeakingForm onSuccess={handleSuccess} />}
        </>
      )}
    </div>
  )
}
