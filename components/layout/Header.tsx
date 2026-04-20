import Link from 'next/link'

const navLinks = [
  { href: '/explainers', label: 'Explainers' },
  { href: '/policy', label: 'Policy' },
  { href: '/pilots', label: 'Pilots' },
  { href: '/actions', label: 'Actions' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <nav
        aria-label="Main navigation"
        className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        <Link href="/" className="font-bold text-lg text-blue-700 hover:text-blue-800">
          Public Future Initiative
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium text-gray-700">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:text-blue-700 transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
