import Link from 'next/link'

const exploreLinks = [
  { href: '/explainers', label: "What's Changing" },
  { href: '/policy', label: 'Policy Paths' },
  { href: '/pilots', label: 'Pilots' },
  { href: '/actions', label: 'Take Action' },
  { href: '/debate', label: 'Debate' },
]

const supportLinks = [
  { href: '/about', label: 'About' },
  { href: '/trust-center', label: 'Trust Center' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/corrections', label: 'Corrections' },
  { href: '/partners', label: 'Partners' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white/70">
      <div className="max-w-page mx-auto px-6 md:px-10 pt-14 pb-10">
        {/* Top section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-serif font-bold text-xl text-white hover:text-white/90 transition-colors"
            >
              Public Future
            </Link>
            <p className="mt-3 text-body-sm text-white/60 leading-relaxed max-w-xs">
              Evidence-based policy, real-world pilots, and civic action — for everyone.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-label-sm uppercase tracking-wider text-white/40 mb-4">
              Explore
            </h3>
            <nav aria-label="Footer explore navigation">
              <ul className="space-y-2.5">
                {exploreLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-body-sm text-white/70 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-label-sm uppercase tracking-wider text-white/40 mb-4">
              About
            </h3>
            <nav aria-label="Footer support navigation">
              <ul className="space-y-2.5">
                {supportLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-body-sm text-white/70 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-label-sm uppercase tracking-wider text-white/40 mb-4">
              Legal &amp; Policy
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5">
                {legalLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-body-sm text-white/70 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-label-sm text-white/40">
            &copy; {new Date().getFullYear()} Public Future Initiative. All rights reserved.
          </p>
          <p className="text-label-sm text-white/30">
            Non-partisan · Evidence-based · Open access
          </p>
        </div>
      </div>
    </footer>
  )
}

