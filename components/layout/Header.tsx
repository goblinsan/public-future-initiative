'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/explainers', label: "What's Changing" },
  { href: '/policy', label: 'Policy Paths' },
  { href: '/pilots', label: 'Pilots' },
  { href: '/actions', label: 'Take Action' },
  { href: '/debate', label: 'Debate' },
  { href: '/trust-center', label: 'Trust Center' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-white border-b border-slate-200 shadow-nav sticky top-0 z-40">
      <nav
        aria-label="Main navigation"
        className="max-w-page mx-auto px-6 md:px-10 h-16 flex items-center justify-between"
      >
        <Link
          href="/"
          className="font-serif font-bold text-lg text-brand-navy hover:text-brand-blue transition-colors shrink-0"
        >
          Public Future
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 text-body-sm font-medium text-slate-600">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="px-3 py-2 rounded-md hover:text-brand-navy hover:bg-brand-slate-light transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-slate-600 hover:text-brand-navy hover:bg-brand-slate-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-slate-200 bg-white px-6 py-4">
          <ul className="space-y-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block px-3 py-2.5 rounded-md text-body-sm font-medium text-slate-700 hover:text-brand-navy hover:bg-brand-slate-light transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

