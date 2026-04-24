'use client'

import { useState, FormEvent } from 'react'
import { Check } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface Props {
  /** Where the signup widget appears — used for analytics context. */
  location?: string
  /**
   * Visual variant.
   * - `default`: light card style (for use on cream/white backgrounds)
   * - `inverted`: dark/navy background (for use inside navy sections)
   */
  variant?: 'default' | 'inverted'
}

type SignupState = 'idle' | 'submitting' | 'success' | 'error'

export default function NewsletterSignup({ location = 'site', variant = 'default' }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<SignupState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const isInverted = variant === 'inverted'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), location }),
      })

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? 'Signup failed')
      }

      setStatus('success')
      trackEvent({ name: 'newsletter_signup', props: { location } })
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div
        className={`rounded-card border p-6 text-center ${
          isInverted
            ? 'bg-white/10 border-white/20 text-white'
            : 'bg-white border-slate-200 shadow-card'
        }`}
      >
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 mb-4">
          <Check className="w-5 h-5" aria-hidden />
        </div>
        <p className={`font-semibold text-heading-sm mb-1 ${isInverted ? 'text-white' : 'text-brand-navy'}`}>
          You&apos;re signed up
        </p>
        <p className={`text-body-sm ${isInverted ? 'text-white/70' : 'text-slate-500'}`}>
          We&apos;ll be in touch when there&apos;s something worth reading.
        </p>
      </div>
    )
  }

  return (
    <div
      className={`rounded-card border p-6 ${
        isInverted
          ? 'bg-white/10 border-white/20'
          : 'bg-white border-slate-200 shadow-card'
      }`}
    >
      <p
        className={`font-semibold text-heading-sm mb-1 ${
          isInverted ? 'text-white' : 'text-brand-navy'
        }`}
      >
        Stay informed
      </p>
      <p
        className={`text-body-sm mb-5 ${isInverted ? 'text-white/70' : 'text-slate-500'}`}
      >
        Evidence updates, new pilots, and policy analysis — delivered when it matters.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
        <label htmlFor={`newsletter-email-${location}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${location}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={`flex-1 border rounded-md px-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-colors ${
            isInverted
              ? 'bg-white/10 border-white/30 text-white placeholder:text-white/40'
              : 'bg-white border-slate-200 text-slate-800 placeholder:text-slate-400'
          }`}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary whitespace-nowrap shrink-0"
        >
          {status === 'submitting' ? 'Signing up…' : 'Sign up'}
        </button>
      </form>

      {status === 'error' && (
        <p className={`mt-3 text-body-sm ${isInverted ? 'text-rose-300' : 'text-rose-600'}`}>
          {errorMessage}
        </p>
      )}

      <p className={`mt-3 text-label-sm ${isInverted ? 'text-white/40' : 'text-slate-400'}`}>
        No spam. Unsubscribe any time.
      </p>
    </div>
  )
}
