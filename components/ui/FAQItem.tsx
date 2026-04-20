'use client'

import { useState } from 'react'

export interface FAQItemProps {
  question: string
  answer: string
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between py-5 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-inset"
      >
        <span className="font-semibold text-body-md text-brand-navy">{question}</span>
        <span
          className={`flex-shrink-0 h-5 w-5 text-brand-blue transition-transform duration-200 mt-0.5 ${open ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-5 text-body-md text-slate-600 leading-relaxed">{answer}</div>
      )}
    </div>
  )
}
