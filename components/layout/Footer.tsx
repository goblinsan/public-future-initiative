import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Public Future Initiative. All rights reserved.
        </p>
        <nav aria-label="Footer navigation" className="flex gap-4 text-sm">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
        </nav>
      </div>
    </footer>
  )
}
